const request = require('supertest');
const nock = require('nock');
const should = require('should');
const chai = require('chai');
const chaiSort = require('chai-sorted');

const expect = chai.expect;
chai.use(chaiSort);

// import mocks
const validMock = require('../mocks/github-success.json');

// start application
const app = require('../app.js');

// set testing mode
process.env.NODE_ENV = 'testing';

describe('GET /', () => {
  it('should return 404 (Not Found)', (done) => {
    request(app)
      .get('/')
      .expect(404)
      .end(done);
  });
});

describe('GET /repositories/', () => {
  it('missing user handle should return 404 (NotFound)', (done) => {
    request(app)
      .get('/repositories/')
      .expect(404)
      .end(done);
  });
});

describe('GET /repositories/{handle}', () => {
  beforeEach(() => {
    // mock the request to external API
    nock(process.env.GITHUB_API_URL)
      .get('/search/repositories?q=user:valid+is:public')
      .reply(200, validMock);
  });


  it('with valid user handle should return 200 (OK)', (done) => {
    request(app)
      .get('/repositories/valid')
      .expect(200)
      .end((err, res) => {
        res.body.count.should.equal(5);
        res.body.data.should.have.lengthOf(5);
        expect(res.body.data).to.be.descendingBy('size');
        res.body.data[0].should.have.property('id').and.be.a.Number();
        res.body.data[0].should.have.property('name').and.be.a.String();
        res.body.data[0].should.have.property('full_name').and.be.a.String();
        res.body.data[0].should.have.property('owner').and.be.a.Object();
        res.body.data[0].owner.should.have.property('login').and.be.a.String();
        res.body.data[0].owner.should.have.property('id').and.be.a.Number();
        res.body.data[0].owner.should.have.property('avatar_url').and.be.a.String();
        res.body.data[0].owner.should.have.property('gravatar_id').and.be.a.String();
        res.body.data[0].owner.should.have.property('url').and.be.a.String();
        res.body.data[0].owner.should.have.property('html_url').and.be.a.String();
        res.body.data[0].should.have.property('private').and.be.a.Boolean();
        res.body.data[0].should.have.property('html_url').and.be.a.String();
        res.body.data[0].should.have.property('description').and.be.a.String();
        res.body.data[0].should.have.property('fork').and.be.a.Boolean();
        res.body.data[0].should.have.property('url').and.be.a.String();
        res.body.data[0].should.have.property('created_at');
        res.body.data[0].should.have.property('updated_at');
        res.body.data[0].should.have.property('pushed_at');
        res.body.data[0].should.have.property('git_url').and.be.a.String();
        res.body.data[0].should.have.property('ssh_url').and.be.a.String();
        res.body.data[0].should.have.property('clone_url').and.be.a.String();
        res.body.data[0].should.have.property('svn_url').and.be.a.String();
        res.body.data[0].should.have.property('homepage').and.be.a.String();
        res.body.data[0].should.have.property('size').and.be.a.Number();
        res.body.data[0].should.have.property('stargazers_count').and.be.a.Number();
        res.body.data[0].should.have.property('watchers_count').and.be.a.Number();
        res.body.data[0].should.have.property('language').and.be.a.String();
        res.body.data[0].should.have.property('has_issues').and.be.a.Boolean();
        res.body.data[0].should.have.property('has_projects').and.be.a.Boolean();
        res.body.data[0].should.have.property('has_downloads').and.be.a.Boolean();
        res.body.data[0].should.have.property('has_wiki').and.be.a.Boolean();
        res.body.data[0].should.have.property('has_pages').and.be.a.Boolean();
        res.body.data[0].should.have.property('forks_count').and.be.a.Number();
        res.body.data[0].should.have.property('mirror_url');
        res.body.data[0].should.have.property('open_issues_count').and.be.a.Number();
        res.body.data[0].should.have.property('forks').and.be.a.Number();
        res.body.data[0].should.have.property('open_issues').and.be.a.Number();
        res.body.data[0].should.have.property('watchers').and.be.a.Number();
        res.body.data[0].should.have.property('default_branch').and.be.a.String();
        res.body.data[0].should.have.property('score').and.be.a.Number();
        done();
      });
  });

  it('with count=1, should return only one record', (done) => {
    request(app)
      .get('/repositories/valid?count=1')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('count');
        res.body.should.have.property('data');
        res.body.count.should.equal(1);
        res.body.data.should.have.lengthOf(1);
        done();
      });
  });

  it('with sortBy=size, should return list sorted by size', (done) => {
    request(app)
      .get('/repositories/valid?sortBy=size')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('count');
        res.body.should.have.property('data');
        expect(res.body.data).to.be.descendingBy('size');
        done();
      });
  });

  it('with sortBy=name, should return list sorted by name', (done) => {
    request(app)
      .get('/repositories/valid?sortBy=name')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('count');
        res.body.should.have.property('data');
        expect(res.body.data).to.be.descendingBy('name');
        done();
      });
  });
});

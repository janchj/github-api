# github-api

HTTP API that exposes github repositories from a user.

## Table of Contents
- [Stack](#stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Ready?](#ready?)
- [Documentation](#documentation)

## Stack
Some of the libraries used to put together the application:
- Express + swagger via connect for the routing of requests.
- Request-promise to handle external HTTP calls.
- Winston + expressWinston used for logging.
- Helmet for common API security practices.
- Dotenv used to manage environment variables.
- Mocha + nock + chai + should + supertests to handle tests.

## Installation
```bash
$ npm install
```
Create a .env file with your local configuration (see next)

## Environment Variables
```bash
PORT=3001 // application port
NODE_ENV=development // node environment
GITHUB_API_URL=https://api.github.com // url for github API
GITHUB_USER_AGENT=github-api // user-agent for github API
```

## Ready?
```bash
npm start (production)
npm run start:dev (development)
```

To run tests
```bash
npm test
```

## Documentation
To access the documentation, start your application and then navigate to yourUrl/docs.
For example: http://localhost:3001/docs

## Examples
`/repositories/:handle`
Returns lists of repositories from provided user handle.
If no sorting is provided, default is size.
If no sorting orientation, default is descending.
If no count is provided, default is all.

`/repositories/:handle?sortBy=size`
Returns lists of repositories from provided user handle sorted by size.

`/repositories/:handle?sortBy=size&sortOrientation=asc`
Returns lists of repositories from provided user handle sorted by size ascending.

`/repositories/:handle?count=1`
Returns a single repository from provided user handle.

## Deployment
Deployment is done using docker and hosted on heroku.

docker-commands:

`docker build -t github-api .`
Builds the container

`docker run --name github-api -p 3001:3001 -d github-api`
Runs the container exposing the 3001 port

`docker logs github-api`
View the container logs

heroku-commands:

`heroku create`
Creates a new heroku application.

`heroku create github-api --region eu`
Creates a new heroku application with provided name and within the EU region.

`heroku container:push web`
Pushes the docker container to heroku.

`heroku open`
Opens the application

Some helpful documentation:
https://devcenter.heroku.com/articles/container-registry-and-runtime#pushing-an-image-s

https://blog.risingstack.com/node-hero-deploy-node-js-heroku-docker/
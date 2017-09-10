const request = require('request-promise');

/* shape repositories response */
const handleReposResponse = (response) => {
  const resItems = response.body.items;
  const repos = [];
  resItems.forEach(repo => repos.push({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    owner: {
      login: repo.owner.login,
      id: repo.owner.id,
      avatar_url: repo.owner.avatar_url,
      gravatar_id: repo.owner.gravatar_id,
      url: repo.owner.url,
      html_url: repo.owner.html_url
    },
    private: repo.private,
    html_url: repo.html_url,
    description: repo.description,
    fork: repo.fork,
    url: repo.url,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    git_url: repo.git_url,
    ssh_url: repo.ssh_url,
    clone_url: repo.clone_url,
    svn_url: repo.svn_url,
    homepage: repo.homepage,
    size: repo.size,
    stargazers_count: repo.stargazers_count,
    watchers_count: repo.watchers_count,
    language: repo.language,
    has_issues: repo.has_issues,
    has_projects: repo.has_projects,
    has_downloads: repo.has_downloads,
    has_wiki: repo.has_wiki,
    has_pages: repo.has_pages,
    forks_count: repo.forks_count,
    mirror_url: repo.mirror_url,
    open_issues_count: repo.open_issues_count,
    forks: repo.forks,
    open_issues: repo.open_issues,
    watchers: repo.watchers,
    default_branch: repo.default_branch,
    score: repo.score
  }));
  return repos;
};

const handleReposErrResponse = (err) => {
  // log error message
  console.log(err);
  // return empty list
  return [];
};

/* get repositories */
const fetchRepositories = (handle) => {
  const options = {
    uri: `${process.env.GITHUB_API_URL}/search/repositories?q=user:${handle}+is:public`,
    headers: {
      'User-Agent': process.env.GITHUB_USER_AGENT
    },
    resolveWithFullResponse: true,
    json: true
  };
  return request(options)
    .then(handleReposResponse)
    .catch(handleReposErrResponse);
};

module.exports = {
  fetchRepositories
};

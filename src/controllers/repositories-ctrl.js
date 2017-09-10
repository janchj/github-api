const services = require('../services');
const shared = require('../shared');

// get repositories list by user
const getRepositoriesByHandle = (req, res, next) => {
  const handle = req.swagger.params.handle.value;
  const count = req.swagger.params.count.value;
  const sortBy = req.swagger.params.sortBy.value;

  // get repositories by user handle
  services.github.fetchRepositories(handle)
    .then((repos) => {
      let repoResponse = {
        count: 0,
        data: []
      };
      if (repos.length > 0) {
        // sort repos by provided key
        const sortedRepos = shared.utils.sortArrayByKeyDesc(repos, sortBy);
        // take the requested # of results
        const filteredRepos = shared.utils.sliceArrayByCount(sortedRepos, count);
        // set repositories response
        repoResponse = {
          count: filteredRepos.length,
          data: filteredRepos
        };
      } else {
        // set response status as not found
        res.statusCode = shared.RESPONSE_CODES.NOT_FOUND;
      }
      // return data as json
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(repoResponse));
    }).catch((err) => {
      next(err);
    });
};

module.exports = {
  getRepositoriesByHandle
};

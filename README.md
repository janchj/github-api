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

## Environment Variables
```bash
PORT=3001 // application port
NODE_ENV=development // node environment
GITHUB_API_URL=https://api.github.com // url for github API
GITHUB_USER_AGENT=github-api // user-agent for github API
```

## Ready?
```bash
npm start
```

To run tests
```bash
npm test
```

## Documentation
To access the documentation, start your application and then navigate to yourUrl/docs.
For example: http://localhost:3001/docs

## Examples:
`/repositories/:handle`
Returns lists of repositories from provided user handle.
If no sorting is provided, default is size.
If no count is provided, default is all.

`/repositories/:handle?sortBy=size`
Returns lists of repositories from provided user handle sorted by size.

`/repositories/:handle?count=1`
Returns a single repository from provided user handle.
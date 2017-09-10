/* eslint-disable no-unused-vars */
/**
 * Module dependencies.
 */
const dotenv = require('dotenv');
const connect = require('connect');
const http = require('http');
const swaggerTools = require('swagger-tools');
const compression = require('compression');
const fs = require('fs');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const helmet = require('helmet');
const jsyaml = require('js-yaml');

/** load environment variables */
dotenv.load();

/** set application dir */
process.chdir(__dirname);

/** create express server */
const app = connect();

/* logging */
const winston = require('winston');
const expressWinston = require('express-winston');

/* swaggerRouter configuration */
const options = {
  controllers: './controllers',
  // useStubs: (process.env.NODE_ENV === 'development') // Conditionally turn on stubs (mock mode)
};

// security configuration
const config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {}
};

/* swagger file configuration */
const spec = fs.readFileSync('./swagger/api.yaml', 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

/* Initialize the Swagger middleware */
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  // interpret swagger resources and attach metadata to request
  app.use(middleware.swaggerMetadata());

  // Provide the security handlers
  app.use(middleware.swaggerSecurity(config.swaggerSecurityHandlers));

  // validate swagger requests
  app.use(middleware.swaggerValidator());

  // compression
  app.use(compression());

  // added helmet framework
  app.use(helmet());

  // bodyparser
  app.use(bodyParser.json());

  // express-winston logger makes sense BEFORE the router.
  // ignore logging if running tests
  if (process.env.NODE_ENV !== 'testing') {
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          timestamp: true
        })
      ]
    }));
  }

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // express-winston errorLogger makes sense AFTER the router.
  // ignore logging if running tests
  if (process.env.NODE_ENV !== 'testing') {
    app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
          timestamp: true
        })
      ]
    }));
  }

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi({ swaggerUi: '/docs' }));

  /** error handling */
  app.use((err, req, res, next) => {
    // shape error response
    const response = {
      code: err.name,
      message: err.message
    };
    // return error as json
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  /** launch server */
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(`${chalk.green('✓')} App is running at ${process.env.PORT}, ${process.env.NODE_ENV} mode`);
    console.log('Press CTRL-C to stop\n');
  });
});

module.exports = app;

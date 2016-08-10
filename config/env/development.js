'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
    options: {
      user: '',
      pass: ''
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    options: {
      // Stream defaults to process.stdout
      // Uncomment/comment to toggle the logging to a log on the file system
      //stream: {
      //  directoryPath: process.cwd(),
      //  fileName: 'access.log',
      //  rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
      //    active: false, // activate to use rotating logs 
      //    fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
      //    frequency: 'daily',
      //    verbose: false
      //  }
      //}
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '975372079237611',
    clientSecret: process.env.FACEBOOK_SECRET || 'ecc48e629cc5ae1852f96a0a93155cdc',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || '1K51HSI1ONoEtrurtx5R3kC1m',
    clientSecret: process.env.TWITTER_SECRET || '2cOTTrk6LaeaYA2iLkM9UPumkg5hB0tXRIkpoy4gqGRh4EK2LQ',
    callbackURL: '/api/auth/twitter/callback'
  },
  google: {
    clientID: '635948789911-unrsue85sebjf1dnhjvr377ce1gbl8q0.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'ncvG_rYpXE3uVGawKF9RiaAQ',
    callbackURL: '/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || '78rx7rmevwa4lj',
    clientSecret: process.env.LINKEDIN_SECRET || 'm8x8ujMdbAnD28pQ',
    callbackURL: '/api/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || '98a4954fe255ab548749',
    clientSecret: process.env.GITHUB_SECRET || '0f1115ce475536131084cb650ceb055b33a06864',
    callbackURL: '/api/auth/github/callback'
  },
  paypal: {
    clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
    clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
    callbackURL: '/api/auth/paypal/callback',
    sandbox: true
  },
  mailer: {
    from: process.env.MAILER_FROM || 'nidhal47@hotmail.fr',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'outlook',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'nidhal47@hotmail.fr',
        pass: process.env.MAILER_PASSWORD || 'n23/12/1963'
      }
    }
  },
  livereload: true,
  seedDB: {
    seed: process.env.MONGO_SEED === 'true' ? true : false,
    options: {
      logResults: process.env.MONGO_SEED_LOG_RESULTS === 'false' ? false : true,
      seedUser: {
        username: process.env.MONGO_SEED_USER_USERNAME || 'user',
        provider: 'local',
        email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
        firstName: 'User',
        lastName: 'Local',
        displayName: 'User Local',
        roles: ['user']
      },
      seedAdmin: {
        username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
        provider: 'local',
        email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
        firstName: 'Admin',
        lastName: 'Local',
        displayName: 'Admin Local',
        roles: ['user', 'admin']
      }
    }
  }
};

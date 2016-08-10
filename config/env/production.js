'use strict';

module.exports = {
  secure: {
    ssl: true,
    privateKey: './config/sslcerts/key.pem',
    certificate: './config/sslcerts/cert.pem'
  },
  port: process.env.PORT || 8443,
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'meanuser:meanpass@ds147965.mlab.com:47965') + '/meanprod',
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
    format: process.env.LOG_FORMAT || 'combined',
    options: {
      // Stream defaults to process.stdout
      // Uncomment/comment to toggle the logging to a log on the file system
      stream: {
        directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
        fileName: process.env.LOG_FILE || 'access.log',
        rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
          active: process.env.LOG_ROTATING_ACTIVE === 'true' ? true : false, // activate to use rotating logs 
          fileName: process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
          frequency: process.env.LOG_ROTATING_FREQUENCY || 'daily',
          verbose: process.env.LOG_ROTATING_VERBOSE === 'true' ? true : false
        }
      }
    }
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '975372079237611',
    clientSecret: process.env.FACEBOOK_SECRET || 'ecc48e629cc5ae1852f96a0a93155cdc',
    callbackURL: '/api/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'KojXphimAS0qRWLwywoxcGLhl',
    clientSecret: process.env.TWITTER_SECRET || 'yYMSNZWe3TZWg4ZghaN85xAiIFz7AoCkAgaFwJdJshyEtOVfqs',
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
    sandbox: false
  },
  mailer: {
    from: 'nidhal47@gmail.com',
    options: {
      service: 'gmail',
      auth: {
        user: 'nidhal47@gmail.com',
        pass: 'N23/12/1963'
      }
    }
  },
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

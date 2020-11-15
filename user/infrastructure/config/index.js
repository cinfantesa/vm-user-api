const env = process.env.NODE_ENV;

const development = {
  server: {
    port: process.env.PORT || 3000
  },
  database: {
    uri: process.env.MONGO_URI,
    name: 'voicemod'
  },
  security: {
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET || 'secret',
      expiration: process.env.SECURITY_JWT_EXPIRATION || '1h'
    }
  }
};

const test = {
  server: {
    port: 3333
  },
  database: {
    uri: process.env.MONGO_URI,
    name: 'test'
  },
  security: {
    jwt: {
      secret: 'secret',
      expiration: '1h'
    }
  }
};

const config = {
  development,
  test
};

module.exports = config[env];
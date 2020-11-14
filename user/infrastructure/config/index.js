const env = process.env.NODE_ENV;

const development = {
  server: {
    port: process.env.PORT || 3000
  },
  database: {
    uri: process.env.MONGO_URI,
    name: 'voicemod'
  }
};

const test = {
  server: {
    port: 3333
  },
  database: {
    uri: process.env.MONGO_URI,
    name: 'test'
  }
};

const config = {
  development,
  test
};

module.exports = config[env];
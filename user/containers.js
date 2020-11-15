const Awilix = require('awilix');

const RegisterUser = require('./application/register-user');
const UserRepository = require('./domain/user-repository');
const PasswordEncryptor = require('./domain/password-encryptor');
const MongoUserRepository = require('./infrastructure/persistence/mongo-user-repository');
const MongoHandler = require('./infrastructure/persistence/mongo-handler');
const Md5PasswordEncryptor = require('./infrastructure/security/md5-password-encryptor');

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY
});

container.register({
  registerUser: Awilix.asClass(RegisterUser),
  userRepository: Awilix.asFunction(UserRepository),
  passwordEncryptor: Awilix.asFunction(PasswordEncryptor),
  db: Awilix.asClass(MongoHandler),
  mongoUserRepository: Awilix.asClass(MongoUserRepository),
  md5PasswordEncryptor: Awilix.asClass(Md5PasswordEncryptor)
});

module.exports = container;
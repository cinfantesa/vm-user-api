const Awilix = require('awilix');

const RegisterUser = require('./application/register-user');
const UserRepository = require('./domain/user-repository');
const PasswordEncryptor = require('./domain/password-encryptor');
const MongoUserRepository = require('./infrastructure/persistence/mongo-user-repository');
const MongoHandler = require('./infrastructure/persistence/mongo-handler');
const BcryptPasswordEncryptor = require('./infrastructure/security/bcrypt-password-encryptor');
const AuthenticationService = require('./infrastructure/security/authentication-service');

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY
});

container.register({
  registerUser: Awilix.asClass(RegisterUser),
  userRepository: Awilix.asFunction(UserRepository),
  passwordEncryptor: Awilix.asFunction(PasswordEncryptor),
  db: Awilix.asClass(MongoHandler),
  mongoUserRepository: Awilix.asClass(MongoUserRepository),
  bcryptPasswordEncryptor: Awilix.asClass(BcryptPasswordEncryptor),
  authenticationService: Awilix.asClass(AuthenticationService)
});

module.exports = container;
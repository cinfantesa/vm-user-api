const Awilix = require('awilix');

const RegisterUser = require('./application/register-user');
const LoginUser = require('./application/login-user');
const UpdateUser = require('./application/update-user');

const UserRepository = require('./domain/user-repository');
const PasswordEncryptor = require('./domain/password-encryptor');
const AuthenticationService = require('./infrastructure/security/authentication-service');

const MongoUserRepository = require('./infrastructure/persistence/mongo-user-repository');
const MongoHandler = require('./infrastructure/persistence/mongo-handler');
const BcryptPasswordEncryptor = require('./infrastructure/security/bcrypt-password-encryptor');

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY
});

container.register({
  registerUser: Awilix.asClass(RegisterUser),
  loginUser: Awilix.asClass(LoginUser),
  updateUser: Awilix.asClass(UpdateUser),
  userRepository: Awilix.asFunction(UserRepository),
  passwordEncryptor: Awilix.asFunction(PasswordEncryptor),
  authenticationService: Awilix.asClass(AuthenticationService),
  db: Awilix.asClass(MongoHandler),
  mongoUserRepository: Awilix.asClass(MongoUserRepository),
  bcryptPasswordEncryptor: Awilix.asClass(BcryptPasswordEncryptor)
});

module.exports = container;
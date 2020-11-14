const Awilix = require('awilix');

const RegisterUser = require('./application/register-user');
const UserRepository = require('./domain/user-repository');
const PasswordEncryptor = require('./domain/password-encryptor');

const container = Awilix.createContainer({
  injectionMode: Awilix.InjectionMode.PROXY
});

container.register({
  registerUser: Awilix.asClass(RegisterUser),
  userRepository: Awilix.asFunction(UserRepository),
  passwordEncryptor: Awilix.asFunction(PasswordEncryptor)
});

module.exports = container;
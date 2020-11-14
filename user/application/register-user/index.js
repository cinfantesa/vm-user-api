const User = require('../../domain/user');

class RegisterUser {
  constructor({ userRepository, passwordEncryptor }) {
    this._userRepository = userRepository;
    this._passwordEncryptor = passwordEncryptor;
  }


  async register({ id, name, info, password }) {
    const userExists = this._userRepository.existsByEmail(info.email);

    if (userExists) {
      throw new Error(`User with given email ${info.email} already exists`);
    }

    const encryptedPassword = await this._passwordEncryptor.encrypt(password);
    const user = new User({ id, name, info, password: encryptedPassword });
    await this._userRepository.save(user);
  }
}

module.exports = RegisterUser;
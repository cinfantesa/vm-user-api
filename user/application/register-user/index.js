const User = require('../../domain/user');

class RegisterUser {
  constructor({ userRepository, passwordEncryptor }) {
    this._userRepository = userRepository;
    this._passwordEncryptor = passwordEncryptor;
  }


  async register({ id, name, info, password }) {
    await this._assertUserNotExists(info.email);

    const encryptedPassword = await this._passwordEncryptor.encrypt(password);
    const user = new User({ id, name, info, password: encryptedPassword });
    await this._userRepository.save(user);
  }

  async _assertUserNotExists(email) {
    const userExists = await this._userRepository.findByEmail(email);

    if (userExists) {
      throw new Error(`User with given email ${email} already exists`);
    }
  }
}

module.exports = RegisterUser;
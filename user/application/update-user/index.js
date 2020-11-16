const User = require('../../domain/user');

class UpdateUser {
  constructor({ userRepository, passwordEncryptor }) {
    this._userRepository = userRepository;
    this._passwordEncryptor = passwordEncryptor;
  }

  async update({ id, name, info, password, newPassword }) {
    const foundUser = await this._userRepository.findByEmail(info.email);
    if (!foundUser) {
      throw new Error(`User with email ${info.email} not found`);
    }

    if(foundUser.id !== id) {
      throw new Error(`There is another register user with email ${info.email}`);
    }

    const passwordMatches = await this._passwordEncryptor.compare(password, foundUser.password);
    if (!passwordMatches) {
      throw new Error(`Password invalid`);
    }

    const encryptedPass = await this._passwordEncryptor.encrypt(newPassword);
    const updatedUser = new User({ id, name, info, password: encryptedPass });
    await this._userRepository.save(updatedUser);
  }
}

module.exports = UpdateUser;
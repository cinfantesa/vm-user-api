const User = require('../../domain/user');

class RegisterUser {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }


  async register({ id, name, info, password }) {
    const user = new User({ id, name, info, password});
    await this.userRepository.save(user);
  }
}

module.exports = RegisterUser;
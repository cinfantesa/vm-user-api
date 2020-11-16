const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../config').security.jwt;

class AuthenticationService {
  constructor({ userRepository, passwordEncryptor }) {
    this._userRepository = userRepository;
    this._passwordEncryptor = passwordEncryptor;
  }

  async authenticate({ email, password }) {
    const foundUser = await this._userRepository.findByEmail(email);
    if (!foundUser) {
      throw new Error('User not found');
    }

    const passwordMatches = await this._passwordEncryptor.compare(password, foundUser.password);
    if (!passwordMatches) {
      throw new Error('Password invalid');
    }

    const { ['password']: ignoredPassword, ...payload } = foundUser;
    return jwt.sign(payload, secret, {
      expiresIn: expiration
    });
  }

  async isAuthenticated(token) {
    try {
      return jwt.verify(token, secret);
    } catch (ex) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = AuthenticationService;
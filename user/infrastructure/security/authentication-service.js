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

    const payload = {
      id: foundUser.id,
      email: foundUser.info.email,
      name: foundUser.name.firstName,
      surnames: foundUser.name.surnames,
      postalCode: foundUser.info.postalCode,
      country: foundUser.info.country,
      phone: foundUser.info.phone
    }
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
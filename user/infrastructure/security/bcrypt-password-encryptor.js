const bcrypt = require('bcrypt');
const salt = 10;

class BcryptPasswordEncryptor {
  async encrypt(password) {
    return await bcrypt.hash(password, salt);
  }
}

module.exports = BcryptPasswordEncryptor;
const bcrypt = require('bcrypt');
const salt = 10;

class BcryptPasswordEncryptor {
  async encrypt(password) {
    return await bcrypt.hash(password, salt);
  }

  async compare(password, encryptedPassword) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}

module.exports = BcryptPasswordEncryptor;
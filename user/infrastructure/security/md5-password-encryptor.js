const md5 = require('md5');

class Md5PasswordEncryptor {
  async encrypt(password) {
    return await md5(password);
  }
}

module.exports = Md5PasswordEncryptor;
const PasswordEncryptor = ({ bcryptPasswordEncryptor }) => {
  return {
    encrypt: async (password) => bcryptPasswordEncryptor.encrypt(password),
    compare: async (password, encryptedPassword) => bcryptPasswordEncryptor.compare(password ,encryptedPassword)
  };
};

module.exports = PasswordEncryptor;
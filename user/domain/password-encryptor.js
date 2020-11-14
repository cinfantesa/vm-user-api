const PasswordEncryptor = ({ bcryptPasswordEncryptor }) => {
  return {
    encrypt: async (password) => bcryptPasswordEncryptor.encrypt(password)
  };
};

module.exports = PasswordEncryptor;
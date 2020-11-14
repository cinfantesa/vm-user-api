const UserRepository = () => {
  return {
    save: async (user) => console.log('saving user', user)
  }
};

module.exports = UserRepository;
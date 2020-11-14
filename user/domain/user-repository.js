const UserRepository = () => {
  return {
    save: async (user) => console.log('saving user', user),
    existsByEmail: async (email) => email === 'pepe@gmail.com'
  }
};

module.exports = UserRepository;
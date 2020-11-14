const UserRepository = ({ mongoUserRepository }) => {
  return {
    save: async (user) => await mongoUserRepository.save(user),
    findByEmail: async (email) => await mongoUserRepository.findByEmail(email)
  }
};

module.exports = UserRepository;
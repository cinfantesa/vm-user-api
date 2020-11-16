const UserRepository = ({ mongoUserRepository }) => {
  return {
    save: async (user) => await mongoUserRepository.save(user),
    findByEmail: async (email) => await mongoUserRepository.findByEmail(email),
    delete: async (id) => await mongoUserRepository.delete(id)
  }
};

module.exports = UserRepository;
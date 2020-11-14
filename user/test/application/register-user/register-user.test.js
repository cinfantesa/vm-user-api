const RegisterUser = require('../../../application/register-user');

describe('Register user', () => {
  let userRepositoryMock;
  let passwordEncryptorMock;
  let registerUser;

  beforeEach(() => {
    userRepositoryMock = {
      existsByEmail: jest.fn(),
      save: jest.fn()
    };

    passwordEncryptorMock = {

    };

    registerUser = new RegisterUser({ userRepository: userRepositoryMock, passwordEncryptor: passwordEncryptorMock })
  });

  test('should throw exception when user already exists', async () => {
    userRepositoryMock.existsByEmail.mockReturnValue(true);

    const user = {
      id: '5ed4e0fd385b75ad664e66d2',
      name: { firstName: 'firstName'},
      info: { email: 'email' },
      password:'password'
    };

    try {
      registerUser.register(user)
    } catch ({ message }) {
      expect(message).toEqual(`User with given email ${user.info.email} already exists`)
    }

    expect(userRepositoryMock.existsByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.existsByEmail.mock.calls[0][0]).toBe(user.info.email);
  });
});
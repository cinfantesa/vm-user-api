const RegisterUser = require('../../../application/register-user');
const User = require('../../../domain/user');

describe('Register user', () => {
  let userRepositoryMock;
  let passwordEncryptorMock;
  let registerUser;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
      save: jest.fn()
    };

    passwordEncryptorMock = {
      encrypt: jest.fn()
    };

    registerUser = new RegisterUser({ userRepository: userRepositoryMock, passwordEncryptor: passwordEncryptorMock })
  });

  test('should throw exception when user already exists', async () => {
    userRepositoryMock.findByEmail.mockReturnValue(true);

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

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(user.info.email);
  });

  test('should save user', async () => {
    userRepositoryMock.findByEmail.mockReturnValue(false);
    passwordEncryptorMock.encrypt.mockReturnValue('encryptedPassword');

    const user = {
      id: '5ed4e0fd385b75ad664e66d2',
      name: { firstName: 'firstName'},
      info: { email: 'email' },
      password:'password'
    };

    await registerUser.register(user);

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(user.info.email);
    expect(userRepositoryMock.save.mock.calls.length).toBe(1);

    const expectedUser = new User({
      id: '5ed4e0fd385b75ad664e66d2',
      name: { firstName: 'firstName'},
      info: { email: 'email' },
      password:'encryptedPassword'
    });

    expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUser);
    expect(passwordEncryptorMock.encrypt.mock.calls.length).toEqual(1);
    expect(passwordEncryptorMock.encrypt.mock.calls[0][0]).toEqual('password');
  });
});
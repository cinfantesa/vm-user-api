const AuthenticationService = require('../../../infrastructure/security/authentication-service');
const User = require('../../../domain/user');

describe('Authentication service', () => {
  let authenticationService;
  let userRepositoryMock;
  let passwordEncryptorMock;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn()
    };
    passwordEncryptorMock = {
      compare: jest.fn()
    };
    authenticationService = new AuthenticationService({
      userRepository: userRepositoryMock,
      passwordEncryptor: passwordEncryptorMock
    });
  });

  test('should throw exception when user not found', async () => {
    userRepositoryMock.findByEmail.mockReturnValue(null);

    try {
      await authenticationService.authenticate({
        email: 'email',
        password: 'password'
      });
    } catch ({ message }) {
      expect(message).toBe('User not found');
    }

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');
  });

  test('should throw exception if passwords does not match', async () => {
    const password = 'differentPassword';
    const user = new User({
      id: 'id',
      name: { firstName: 'firstName' },
      info: { email: 'email' },
      password
    })

    userRepositoryMock.findByEmail.mockReturnValue(user);
    passwordEncryptorMock.compare.mockReturnValue(false);

    try {
      await authenticationService.authenticate({
        email: 'email',
        password: 'password'
      });
    } catch ({ message }) {
      expect(message).toBe('Password invalid');
    }

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(1);
    expect(passwordEncryptorMock.compare.mock.calls[0][0]).toBe('password');
    expect(passwordEncryptorMock.compare.mock.calls[0][1]).toBe(password);
  });

  test('should return a token', async () => {
    const password = 'password';
    const user = new User({
      id: 'id',
      name: { firstName: 'firstName' },
      info: { email: 'email' },
      password
    })

    userRepositoryMock.findByEmail.mockReturnValue(user);
    passwordEncryptorMock.compare.mockReturnValue(true);


    const token = await authenticationService.authenticate({
      email: 'email',
      password: 'password'
    });

    expect(token).not.toBeNull();

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toEqual('email');
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(1);
  });
});
const UpdateUser = require('../../../application/update-user');
const User = require('../../../domain/user');

describe('Update user', () => {
  let userRepositoryMock;
  let passwordEncryptorMock;
  let updateUser;
  let userRequest;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
      save: jest.fn()
    };
    passwordEncryptorMock = {
      encrypt: jest.fn(),
      compare: jest.fn()
    }
    updateUser = new UpdateUser({ userRepository: userRepositoryMock, passwordEncryptor: passwordEncryptorMock });

    userRequest = {
      id: '1',
      name: { firstName: 'firstName'},
      info: { email: 'email' },
      password:'password',
      newPassword: 'newPassword'
    };
  });

  test('should throw exception when user not exist with given email', async () => {
    userRepositoryMock.findByEmail.mockReturnValue(null);

    try {
      await updateUser.update(userRequest);
    } catch ({ message }) {
      expect(message).toEqual(`User with email ${userRequest.info.email} not found`);
    }

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(0);
    expect(passwordEncryptorMock.encrypt.mock.calls.length).toBe(0);
  });

  test('should throw exception when given email belongs another user', async () => {
    const foundUser = new User({
      id: 'differentId',
      info: userRequest.info,
      name: userRequest.name,
      password: 'wrongPassword'
    });
    userRepositoryMock.findByEmail.mockReturnValue(foundUser);

    try {
      await updateUser.update(userRequest);
    } catch ({ message }) {
      expect(message).toEqual(`There is another register user with email ${userRequest.info.email}`);
    }

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(0);
    expect(passwordEncryptorMock.encrypt.mock.calls.length).toBe(0);
  });

  test('should throw exception when given password does not match', async () => {
    const foundUser = new User({
      id: userRequest.id,
      info: userRequest.info,
      name: userRequest.name,
      password: 'password'
    });
    userRepositoryMock.findByEmail.mockReturnValue(foundUser);
    passwordEncryptorMock.compare.mockReturnValue(false);

    try {
      await updateUser.update(userRequest);
    } catch ({ message }) {
      expect(message).toEqual(`Password invalid`);
    }

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
    expect(passwordEncryptorMock.encrypt.mock.calls.length).toBe(0);
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(1);
    expect(passwordEncryptorMock.compare.mock.calls[0][0]).toBe(userRequest.password);
    expect(passwordEncryptorMock.compare.mock.calls[0][1]).toBe(foundUser.password);
  });

  test('should update user', async () => {
    const foundUser = new User({
      id: userRequest.id,
      info: userRequest.info,
      name: userRequest.name,
      password: 'password'
    });
    userRepositoryMock.findByEmail.mockReturnValue(foundUser);
    passwordEncryptorMock.compare.mockReturnValue(true);
    passwordEncryptorMock.encrypt.mockReturnValue('newPassword');

    await updateUser.update(userRequest);

    const expectedUpdatedUser = Object.assign({}, foundUser, { _password: 'newPassword' });

    expect(userRepositoryMock.findByEmail.mock.calls.length).toBe(1);
    expect(userRepositoryMock.findByEmail.mock.calls[0][0]).toBe(userRequest.info.email);
    expect(passwordEncryptorMock.encrypt.mock.calls.length).toBe(1);
    expect(passwordEncryptorMock.encrypt.mock.calls[0][0]).toBe(userRequest.newPassword);
    expect(passwordEncryptorMock.compare.mock.calls.length).toBe(1);
    expect(passwordEncryptorMock.compare.mock.calls[0][0]).toBe(userRequest.password);
    expect(passwordEncryptorMock.compare.mock.calls[0][1]).toBe(foundUser.password);
    expect(userRepositoryMock.save.mock.calls.length).toBe(1);
    expect(userRepositoryMock.save.mock.calls[0][0]).toEqual(expectedUpdatedUser);
  });
});
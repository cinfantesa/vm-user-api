const MongoUserRepository = require('../../../infrastructure/persistence/mongo-user-repository');
const User = require('../../../domain/user');
const { toDomain } = require('../../../infrastructure/persistence/user-parser');

describe('User mongo repository', () => {
  let dbMock;
  let mongoUserRepository;

  beforeEach(() => {
    dbMock = {
      connect: jest.fn(),
      disconnect: jest.fn()
    };
    mongoUserRepository = new MongoUserRepository({ db: dbMock });
  });

  test('should insert a user into collection', async () => {
    const saveMock = jest.fn(() => Promise.resolve());
    const collectionMock = {
      collection: () => {
        return { replaceOne: saveMock }
      }
    };

    dbMock.connect.mockReturnValue(collectionMock);

    const user = new User({
      id: '1',
      name: { firstName: 'firstName', surnames: 'surnames' },
      info: { email: 'email', country: 'country', phone: 'phone', postalCode: 'postalCode' },
      password:'password'
    });
    await mongoUserRepository.save(user);

    const expectedUserDocument = {
      _id: user.id,
      name: user.name.firstName,
      surnames: user.name.surnames,
      email: user.info.email,
      phone: user.info.phone,
      country: user.info.country,
      postalCode: user.info.postalCode,
      password: user.password
    };

    expect(saveMock.mock.calls.length).toBe(1);
    expect(saveMock.mock.calls[0][1]).toEqual(expectedUserDocument);
  });

  test('should return null if no user found by email', async () => {
    const findOneMock = jest.fn(() => Promise.resolve());
    const collectionMock = {
      collection: () => {
        return { findOne: findOneMock }
      }
    };
    dbMock.connect.mockReturnValue(collectionMock);

    const actualUser = await mongoUserRepository.findByEmail('email');

    expect(findOneMock.mock.calls.length).toBe(1);
    expect(findOneMock.mock.calls[0][0]).toEqual({ email: 'email' });
    expect(actualUser).toEqual(null);
  });

  test('should return user found by email', async () => {
    const userDocument = {
      _id: '1',
      name: 'firstName',
      surnames: 'surnames',
      email: 'email',
      country: 'country',
      phone: 'phone',
      postalCode: 'postalCode',
      password:'password'
    };


    const findOneMock = jest.fn(() => Promise.resolve(userDocument));
    const collectionMock = {
      collection: () => {
        return { findOne: findOneMock }
      }
    };
    dbMock.connect.mockReturnValue(collectionMock);

    const actualUser = await mongoUserRepository.findByEmail('email');

    expect(findOneMock.mock.calls.length).toBe(1);
    expect(findOneMock.mock.calls[0][0]).toEqual({ email: 'email' });

    const expectedUser = toDomain(userDocument);

    expect(actualUser).toEqual(expectedUser);
  });

  test('should delete user', async () => {
    const removeMock = jest.fn(() => Promise.resolve({}));
    const collectionMock = {
      collection: () => {
        return { remove: removeMock }
      }
    };
    dbMock.connect.mockReturnValue(collectionMock);

    await mongoUserRepository.delete('id');

    expect(removeMock.mock.calls.length).toBe(1);
    expect(removeMock.mock.calls[0][0]).toEqual({ _id: 'id' });
  });
});
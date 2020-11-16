const DeleteUser = require('../../../application/delete-user');

describe('Delete user', () => {
  let userRepositoryMock;
  let deleteUser;

  beforeEach(() => {
    userRepositoryMock = {
      delete: jest.fn()
    };

    deleteUser = new DeleteUser({ userRepository: userRepositoryMock });
  });

  test('should delete user', async () => {
    await deleteUser.delete({ id: '1' });

    expect(userRepositoryMock.delete.mock.calls.length).toBe(1);
    expect(userRepositoryMock.delete.mock.calls[0][0]).toBe('1');
  })
});
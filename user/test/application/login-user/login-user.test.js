const LoginUser = require('../../../application/login-user');

describe('Login user', () => {
  let authenticationServiceMock;
  let loginUser;

  beforeEach(() => {
    authenticationServiceMock = {
      authenticate: jest.fn()
    };

    loginUser = new LoginUser({ authenticationService: authenticationServiceMock});
  });

  test('should login a user and return token', async () => {
    authenticationServiceMock.authenticate.mockReturnValue('token');

    const request = {
      email: 'email',
      password: 'password'
    };
    await loginUser.login(request);

    expect(authenticationServiceMock.authenticate.mock.calls.length).toBe(1);
    expect(authenticationServiceMock.authenticate.mock.calls[0][0]).toEqual(request);
  });
});
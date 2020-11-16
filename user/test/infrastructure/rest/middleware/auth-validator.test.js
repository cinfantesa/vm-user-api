const authenticationServiceMock = {
  isAuthenticated: () => {}
};

const container = require('../../../../containers');
const awilix = require('awilix');

container.register({
  authenticationService: awilix.asValue(authenticationServiceMock)
});

const httpMocks = require('node-mocks-http');
const authValidator = require('../../../../infrastructure/rest/middleware/auth-validator');

describe('auth validator', () => {
  it('should return 401 when no headers provided', async (next) => {
    const res = httpMocks.createResponse();

    const response = await authValidator({}, res, next);
    const { statusCode, _getData, getHeader } = response

    const expectedError = { error: 'authentication required ' }

    expect(statusCode).toEqual(401);
    expect(_getData()).toEqual(expectedError);
    expect(getHeader('content-type')).toContain('application/json');

    next();
  });

  it('should return 401 when authorization header is present but without bearer', async (next) => {
    const res = httpMocks.createResponse();
    const req = {
      headers: {
        authorization: 'pepe'
      }
    };

    const { statusCode, _getData, getHeader } = await authValidator(req, res, next);
    const expectedError = { error: 'invalid token' }

    expect(statusCode).toEqual(401);
    expect(_getData()).toEqual(expectedError);
    expect(getHeader('content-type')).toContain('application/json');

    next();
  });

  it('should return 401 when authorization header is present but without token value', async (next) => {
    authenticationServiceMock.isAuthenticated = () => Promise.reject({ message: 'invalid.token' });
    const res = httpMocks.createResponse();
    const req = {
      headers: {
        authorization: 'Bearer '
      }
    };

    const { statusCode, _getData, getHeader } = await authValidator(req, res, next);

    const expectedError = { error: 'invalid.token' }

    expect(statusCode).toEqual(401);
    expect(_getData()).toEqual(expectedError);
    expect(getHeader('content-type')).toContain('application/json');

    next();
  });

  it('should return 401 when token provided is invalid', async (next) => {
    authenticationServiceMock.isAuthenticated = () => Promise.reject({ message: 'invalid.token' });

    const res = httpMocks.createResponse();
    const req = {
      headers: {
        authorization: 'Bearer 12345'
      }
    };

    const response = await authValidator(req, res, next);
    const { statusCode, _getData, getHeader } = response;

    const expectedError = { error: 'invalid.token' }

    expect(statusCode).toEqual(401);
    expect(_getData()).toEqual(expectedError);
    expect(getHeader('content-type')).toContain('application/json');

    next();
  });

  it('should call next', async (next) => {
    authenticationServiceMock.isAuthenticated = () => Promise.resolve({});
    const dummyToken = 'dummyValidJWT';
    const res = httpMocks.createResponse();
    const req = {
      headers: {
        authorization: `Bearer ${dummyToken}`
      }
    };

    const result = await authValidator(req, res, next);

    expect(result).toBeUndefined();

    next();
  });
});
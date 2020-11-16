const registerUserMock = {
  register: jest.fn()
}

const loginUserMock = {
  login: jest.fn()
};

const updateUserMock = {
  update: jest.fn()
};

const container = require('../../../containers');
const Awilix = require('awilix');
container.register({
  registerUser: Awilix.asValue(registerUserMock),
  loginUser: Awilix.asValue(loginUserMock),
  updateUser: Awilix.asValue(updateUserMock)
});

const { app, server } = require('../../../index');
const supertest = require('supertest');
const request = supertest(app);

describe('User controller', () => {
  describe('POST register user', () => {
    test('should return 422 when sending empty body', async () => {
      const res = await request.post('/users');

      const expectedErrors = [
        { message: 'Field cannot be blank', field: 'id' },
        { message: 'Field cannot be blank', field: 'name' },
        { message: 'Field cannot be blank', field: 'password' },
        { message: 'Field cannot be blank', field: 'email' },
      ];

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 when invalid email', async () => {
      const res = await request.post('/users')
        .send({
          id: 'id',
          name: 'name',
          email: 'email',
          password: 'password'
        });

      const expectedErrors = [
        { message: 'Provided value has no correct format for field', field: 'email' },
      ]

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 when password is shorter than 7', async () => {
      const res = await request.post('/users')
        .send({
          id: 'id',
          name: 'name',
          email: 'valid@mail.com',
          password: 'pass'
        });

      const expectedErrors = [
        { message: 'Provided value has no correct format for field', field: 'password' },
      ]

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 201 when user is registered', async () => {
      const res = await request.post('/users')
        .send({
          id: 'id',
          name: 'name',
          email: 'valid@mail.com',
          password: 'password'
        });

      const { status, headers } = res;
      expect(status).toBe(201);
    });
  });

  describe('POST login user', () => {
    test('should return 422 status when login without passing values', async () => {
      const res = await request.post('/login')
        .send({});

      const expectedErrors = [
        { message: 'Field cannot be blank', field: 'email' },
        { message: 'Field cannot be blank', field: 'password' },
      ]

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 status when login providing invalid email', async () => {
      const res = await request.post('/login')
        .send({
          password: 'password',
          email: 'email'
        });

      const expectedErrors = [
        { message: 'Provided value has no correct format for field', field: 'email' },
      ]

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 200 status when login correctly', async () => {
      const token = 'token';
      loginUserMock.login.mockReturnValue(token);

      const res = await request.post('/login')
        .send({
          password: 'password',
          email: 'email@email.com'
        });

      const { status, body, headers } = res;
      expect(status).toBe(200);
      expect(body).toEqual({ token });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 500 status when login an error ocurred', async () => {
      loginUserMock.login.mockRejectedValue('error');

      const res = await request.post('/login')
        .send({
          password: 'password',
          email: 'email@email.com'
        });

      const { status } = res;
      expect(status).toBe(500);
    });
  });

  describe('PUT update user', () => {
    test('should return 422 when sending empty body', async () => {
      const res = await request.put('/users/1')
        .send({});

      const expectedErrors = [
        { message: 'Field cannot be blank', field: 'name' },
        { message: 'Field cannot be blank', field: 'surnames' },
        { message: 'Field cannot be blank', field: 'country' },
        { message: 'Field cannot be blank', field: 'phone' },
        { message: 'Field cannot be blank', field: 'postalCode' },
        { message: 'Field cannot be blank', field: 'newPassword' },
        { message: 'Field cannot be blank', field: 'password' },
        { message: 'Field cannot be blank', field: 'email' },
      ];

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 status when invalid email', async () => {
      const res = await request.put('/users/1')
        .send({
          id: 'id',
          name: 'name',
          surnames: 'surnames',
          email: 'email',
          password: 'password',
          newPassword: 'newPassword',
          country: 'Spain',
          phone: '655444333',
          postalCode: '03690'
        });

      const expectedErrors = [
        { message: 'Provided value has no correct format for field', field: 'email' },
      ];

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 status when password is shorter than 7', async () => {
      const res = await request.put('/users/1')
        .send({
          id: 'id',
          name: 'name',
          surnames: 'surnames',
          email: 'email@email.com',
          password: 'password',
          newPassword: 'short',
          country: 'Spain',
          phone: '655444333',
          postalCode: '03690'
        });

      const expectedErrors = [
        { message: 'Provided value has no correct format for field', field: 'newPassword' },
      ];

      const { status, body, headers } = res;
      expect(status).toBe(422);
      expect(body).toEqual({ errors: expectedErrors });
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 204 status when updating a user correctly', async () => {
      updateUserMock.update = () => {};

      const res = await request.put('/users/1')
        .send({
          id: 'id',
          name: 'name',
          surnames: 'surnames',
          email: 'email@email.com',
          password: 'password',
          newPassword: 'newPassword',
          country: 'Spain',
          phone: '655444333',
          postalCode: '03690'
        });

      const { status } = res;
      expect(status).toBe(204);
    });
  });

  afterAll(async () => {
    await server.close();
  });
});
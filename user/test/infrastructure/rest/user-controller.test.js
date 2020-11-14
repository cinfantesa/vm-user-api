const registerUserMock = {
  register: jest.fn()
}

const container = require('../../../containers');
const Awilix = require('awilix');
container.register({
  registerUser: Awilix.asValue(registerUserMock)
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

  afterAll(async () => {
    await server.close();
  });
});
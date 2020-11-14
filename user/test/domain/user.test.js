const User = require('../../domain/user');

describe('User', () => {
  test('should throw error whe id is null', () => {
    try {
      new User({ id: null });
    } catch(ex) {
      expect(ex.message).toBe('Id required');
    }
  });

  test('should throw error when password is null', () => {
    try {
      new User({ id: 'id', name: { firstName: 'firstName'}, password: null });
    } catch(ex) {
      expect(ex.message).toBe('Password required');
    }
  });

  test('should throw error when password is shorter than 7 characters', () => {
    try {
      new User({ id: 'id', name: { firstName: 'firstName'}, password: '123456' });
    } catch(ex) {
      expect(ex.message).toBe('Password length must be greater than 7 characters');
    }
  });

  test('should throw error when firstName is null', () => {
    try {
      new User({ id: 'id', password: '123456' });
    } catch(ex) {
      expect(ex.message).toBe('User name is required');
    }
  });

  test('should throw error when email is null', () => {
    try {
      new User({ id: 'id', name: { firstName: 'firstName'}, password: '1234567' });
    } catch(ex) {
      expect(ex.message).toBe('Email required');
    }
  });

  test('should create user correctly', () => {
    const actualUser = new User({
      id: 'id',
      name: { firstName: 'firstName' },
      password: '1234567',
      info: { email: 'email', country: 'country', phone: 'phone', postalCode: 'postalCode'}
    });

    const expectedUser = {
      _id: 'id',
      _name: { _firstName: 'firstName' },
      _password: '1234567',
      _info: { _email: 'email', _country: 'country', _phone: 'phone', _postalCode: 'postalCode'}
    };

    expect(actualUser).toEqual(expectedUser);
  });
});
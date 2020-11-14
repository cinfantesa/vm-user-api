require('dotenv').config();

const container = require('./containers');

const registerUser = container.resolve('registerUser');
registerUser.register({
  id: 1,
  name: { firstName: 'pepe', surnames: 'viyuela'},
  info: { email: 'pepe@gmail.com', country: 'ES', phone: '666555444', postalCode: '23700' },
  password: '12345678'
});
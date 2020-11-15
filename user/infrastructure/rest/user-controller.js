const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const container = require('../../containers');
const registerUser = container.resolve('registerUser');
const loginUser = container.resolve('loginUser');

const { isBodyValid } = require('../../infrastructure/rest/middleware/rest-validator');

router.post('/users', [
  check('id').notEmpty(),
  check('name').notEmpty(),
  check('password')
    .notEmpty()
    .bail()
    .isLength({ min: 7 }),
  check('email')
    .notEmpty()
    .bail()
    .isEmail()
], isBodyValid, async (req, res, next) => {
  const { id, name, surnames, postalCode, country, email, phone, password } = req.body;
  const request = {
    id,
    name: { firstName: name, surnames },
    info: { email, postalCode, country, phone },
    password
  };

  try {
    await registerUser.register(request);

    return res.status(201).send();
  } catch (ex) {
    next(ex);
  }
});

router.post('/login', [
  check('email')
    .notEmpty()
    .bail()
    .isEmail(),
  check('password')
    .notEmpty()
], isBodyValid, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser.login({ email, password });
    res.status(200).send({ token });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
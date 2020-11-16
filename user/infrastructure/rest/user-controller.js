const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const container = require('../../containers');
const registerUser = container.resolve('registerUser');
const loginUser = container.resolve('loginUser');
const updateUser = container.resolve('updateUser');
const deleteUser = container.resolve('deleteUser');

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

router.put('/users/:id', [
  check('name').notEmpty(),
  check('surnames').notEmpty(),
  check('country').notEmpty(),
  check('phone').notEmpty(),
  check('postalCode').notEmpty(),
  check('newPassword').notEmpty()
    .bail()
    .isLength({ min: 7 }),
  check('password')
    .notEmpty(),
  check('email')
    .notEmpty()
    .bail()
    .isEmail()
], isBodyValid, async (req, res, next) => {
  const { name, surnames, postalCode, country, email, phone, password, newPassword } = req.body;
  const request = {
    id: req.params.id,
    name: { firstName: name, surnames },
    info: { email, postalCode, country, phone },
    password,
    newPassword
  };

  try {
    await updateUser.update(request);
    return res.status(204).send();
  } catch (ex) {
    next(ex);
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUser.delete(id);
    return res.status(204).send();
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
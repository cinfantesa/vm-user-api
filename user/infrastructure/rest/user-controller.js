const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const container = require('../../containers');
const registerUser = container.resolve('registerUser');

const { isBodyValid } = require('../../infrastructure/rest/middleware/rest-validator');

router.post('/', [
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

module.exports = router;
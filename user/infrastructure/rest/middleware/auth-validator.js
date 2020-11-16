const container = require('../../../containers');
const authenticationService = container.resolve('authenticationService');

const authValidator = async (req, res, next) => {
  const { headers } = req;

  if (!headers || !headers['authorization']) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).send({ error: 'authentication required ' });
  }

  const [bearer, token] = headers['authorization'].split(" ");

  if (bearer !== 'Bearer') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).send({ error: 'invalid token' });
  }

  try {
    await authenticationService.isAuthenticated(token);
  } catch ({ message }) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).send({ error: message });
  }

  next();
}

module.exports = authValidator;
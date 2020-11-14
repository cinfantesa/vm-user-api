module.exports = (err, req, res) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack || err);
  }
  const message = err.message || err;
  res.status(500).send({ error: message });
};
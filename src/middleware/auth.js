const auth = async (req, res, next) => {
  const key = req.params.key;
  if (key === process.env.KEY) next();
  else res.status(401).send({ error: 'Please authenticate' });
};

module.exports = auth;

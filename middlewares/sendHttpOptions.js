const sendHttpOptions = (req, res) => {
  const { allowMethods } = req;

  return res.header('Access-Control-Allow-Methods', allowMethods)
    .send();
};

module.exports = sendHttpOptions;

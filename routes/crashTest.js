const express = require('express');

const router = express.Router({ strict: true });
// const { serverCrash } = require('../messages/app');

router.get('/crash-test', (req, res) => {
  setTimeout(() => {
    // TODO должно быть закомментировано, в рабочем режиме
    //  а так-же подключение функции serverCrash выше
    // throw new Error(serverCrash);
  }, 0);
  return res.status(200).send();
});

module.exports = router;

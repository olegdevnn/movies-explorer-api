// Список допустимых сайтов, с которых можно обращаться по api
// Без '/' в конце.
const corsSettings = {
  whiteList: [
    'http://localhost',
    'http://localhost:3001',
    'https://oleg-zvonilov-diplom.students.nomoredomains.monster',
  ],
};

module.exports = corsSettings;

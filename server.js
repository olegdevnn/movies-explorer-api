const app = require('./app.js');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`CORS включен, сервер запущен на порту ${PORT}`);
});

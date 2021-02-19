// Параметры ограничения по кол-ву запросов в определенное время
const rateLimiterSettings = {
  // 15 минут
  windowMs: 15 * 60 * 1000,

  // Кол-во соединений за время (windowMs)
  max: 500,
};

module.exports = rateLimiterSettings;

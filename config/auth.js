const authSettings = {
  jwt: {
    // Секретный ключ, используется в разных модулях
    secret: process.env.JWT_SECRET || 'dev-secret',

    // Срок действия токена (7 дней)
    expiresIn: 86400 * 7,
  },
};

module.exports = authSettings;

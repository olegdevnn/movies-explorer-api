const verifyStrongPassword = (password, helpers) => {
  if (password.match(/[0-9]/)
    && password.match(/[a-z]/)
    && password.match(/[A-Z]/)
    && password.match(/[^0-9a-z]/i)
  ) {
    return password;
  }

  return helpers.error('password.notStrong');
};

module.exports = verifyStrongPassword;

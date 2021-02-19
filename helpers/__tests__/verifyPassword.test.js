const verifyPassword = require('../verifyStrongPassword');

const helpers = {
  error: () => 'password.invalid',
};

const testBadPassword = ({ password }) => {
  expect(verifyPassword(password, helpers)).not.toBe(password);
  expect(verifyPassword(password, helpers)).toBe('password.invalid');
};

describe('Тестируем проверку пароля на сложность', () => {
  it('Должен вернуться шаблон ошибки, если пароль пустой', () => {
    expect.assertions(2);
    testBadPassword({ password: '' });
  });

  it('Должен вернуться шаблон ошибки, если в пароле только 0-9', () => {
    expect.assertions(2);
    testBadPassword({ password: '13' });
  });

  it('Должен вернуться шаблон ошибки, если в пароле только 0-9a-z', () => {
    expect.assertions(2);
    testBadPassword({ password: '12ab' });
  });

  it('Должен вернуться шаблон ошибки, если в пароле только 0-9a-zA-Z', () => {
    expect.assertions(2);
    testBadPassword({ password: '12abAB' });
  });

  it('Должен вернуться пароль, если пароль сложный', () => {
    expect.assertions(3);
    const password = '12abAB!!';
    expect(verifyPassword(password, helpers)).toBe(password);
    expect(typeof verifyPassword(password, helpers)).toBe('string');
    expect(verifyPassword(password, helpers)).not.toBe('password.invalid');
  });
});

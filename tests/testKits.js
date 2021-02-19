const {
  ERROR_BAD_REQUEST,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  OK,
} = require('../units/httpCodes');

const testCheckLangMessage = (message) => {
  expect(message).not.toMatch(/^[a-z]/i);
  expect(message).toMatch(/[а-я]/i);
};

const testSchemaErrorCheck = (schema, data) => {
  const { error } = schema.validate(data);
  const { message } = error;

  expect(error).toBeDefined();
  testCheckLangMessage(message);
};

const testBadRequestCheck = ({ status, headers, body: { message } }) => {
  expect(status).toBe(ERROR_BAD_REQUEST);
  expect(headers['content-type']).toMatch('application/json');
  testCheckLangMessage(message);
};

const testForbiddenRequestCheck = ({ status, headers, body: { message } }) => {
  expect(status).toBe(ERROR_FORBIDDEN);
  expect(headers['content-type']).toMatch('application/json');
  testCheckLangMessage(message);
};

const testNotFoundRequestCheck = ({ status, headers, body: { message } }) => {
  expect(status).toBe(ERROR_NOT_FOUND);
  expect(headers['content-type']).toMatch('application/json');
  testCheckLangMessage(message);
};

const testChangeUserRequestCheck = ({ status, headers, body }, newData) => {
  expect(status).toBe(OK);
  expect(headers['content-type']).toMatch('application/json');
  expect(body).toMatchObject(newData);
  expect(body).not.toMatchObject({
    password: expect.any(String),
  });
};

module.exports = {
  testSchemaErrorCheck,
  testBadRequestCheck,
  testForbiddenRequestCheck,
  testNotFoundRequestCheck,
  testChangeUserRequestCheck,
};

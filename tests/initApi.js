const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const request = require('supertest');

const app = require('../app');

const agent = request.agent(app, {});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const getToken = () => agent.get('/getToken')
  .then(({ headers }) => {
    try {
      return headers['set-cookie'].map((i) => i.split(';')[0]).join(';');
    } catch (e) {
      return undefined;
    }
  });

const signup = async ({ email, password, name }) => agent
  .post('/signup')
  .set('Cookie', await getToken())
  .send({
    email,
    password,
    name,
  })
  .then(({ body }) => body);

const signin = async ({ email, password }) => agent
  .post('/signin')
  .set('Cookie', await getToken())
  .send({
    email,
    password,
  }).then(({ body }) => body);

const logout = async () => agent
  .post('/logout');

module.exports = {
  agent,
  getToken,
  signup,
  signin,
  logout,
};

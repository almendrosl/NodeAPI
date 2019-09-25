const app = require('../../app');
const request = require('supertest');
const { User } = require('../../models/userModel');

const userAdmin = {
  name: 'Admin',
  password: 'paswordFalse123',
  email: 'pepe@papa.com',
  isAdmin: true
};
const userToEliminate = {};
const newEmail = 'email1@email.com';

beforeAll(async () => {
  await User.deleteMany();
  const resUserA = await request(app)
    .post('/users')
    .send(userAdmin);
  userAdmin.token = resUserA.header['x-auth-token'];
  userAdmin._id = resUserA.body._id;
  const resUserE = await request(app)
    .post('/users')
    .send({
      name: 'Eliminado',
      password: 'paswordFalse123',
      email: 'pepeEliminado@papa.com'
    });
  userToEliminate._id = resUserE.body._id;
});

test('Should get all users', async () => {
  await request(app)
    .get('/users')
    .set('x-access-token', userAdmin.token)
    .expect('Content-Type', /json/)
    .expect(200);
});

test('Should get one users', async () => {
  await request(app)
    .get(`/users/${userAdmin._id}/`)
    .set('x-access-token', userAdmin.token)
    .expect('Content-Type', /json/)
    .expect(200);
});

test('Test post user', async () => {
  const mockUser = {
    name: 'Inser User',
    email: 'pepea@papa.com'
  };
  const res = await request(app)
    .post('/users')
    .send({
      ...mockUser,
      password: 'paswordFalse123'
    })
    .expect(200);

  expect(res.body.name).toBe(mockUser.name);
  expect(res.body.email).toBe(mockUser.email);
});

test('Should delete one users', async () => {
  await request(app)
    .delete(`/users/${userToEliminate._id}/`)
    .set('x-access-token', userAdmin.token)
    .expect(200);
});

test('Should update email one users', async () => {
  await request(app)
    .put(`/users/${userAdmin._id}/`)
    .set('x-access-token', userAdmin.token)
    .send({
      email: 'email1@email.com'
    })
    .expect(200);
});

test('Should save city to one user', async () => {
  await request(app)
    .put(`/users/saveCity/${userAdmin._id}/`)
    .set('x-access-token', userAdmin.token)
    .send({
      city: 'Cordoba, Cordoba, Argentina'
    })
    .expect(200);
});

test('Should save city to one user', async () => {
  await request(app)
    .put(`/users/saveCity/${userAdmin._id}/`)
    .set('x-access-token', userAdmin.token)
    .send({
      city: 'Cordoba, Cordoba, Argentina'
    })
    .expect(200);
});

test('Should get one whitout id users', async () => {
  await request(app)
    .get(`/users/current`)
    .set('x-access-token', userAdmin.token)
    .expect('Content-Type', /json/)
    .expect(200);
});

test('Shuld login a user', async () => {
  const resp = await request(app)
    .post('/users/login')
    .send({
      email: newEmail,
      password: userAdmin.password
    });
});

test('Shuld logout a user', async () => {
  const resp = await request(app)
    .get('/users/logout')
    .expect('Content-Type', /json/)
    .expect(200);
});

import request from 'supertest';
import app from '../src/app';
const random = require("crypto").randomBytes(16).toString("hex")

describe(`GET /api/v1/random`, () => {
  it('responds with 404 status code', (done) => {
    request(app)
      .get(`/api/v1/${random}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('POST /api/v1/register', () => {
  it('registers a user and responds with 201 status code', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'securepassword12345',
      phone: '1234567890',
    };

    request(app)
      .post(`/api/v1/register`)
      .set('Accept', 'application/json')
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        if (err) return done();
        expect(res.body.message).toBe('User registered successfully');
        expect(res.body.user.firstname).toBe(newUser.firstname);
        expect(res.body.user.lastname).toBe(newUser.lastname);
        done();
      });
  });

  it('responds with a 400 status code on invalid input', (done) => {
    const invalidUser = {
      firstname: 'John',
    };

    request(app)
      .post(`/api/v1/register`)
      .set('Accept', 'application/json')
      .send(invalidUser)
      .expect(400, done);
  });
});

describe('POST /api/v1/login', () => {
  it('logs in a user and responds with 200 status code', (done) => {
    const loginData = {
      email: 'john.doe@example.com',
      password: 'securepassword12345'
    };

    request(app)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(loginData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).toBe(true);
        expect(res.body.user.firstname).toBe('John');
        expect(res.body.user.lastname).toBe('Doe');
        expect(res.body.user.email).toBe(loginData.email);
        done();
      });
  });

  it('responds with a 401 status code on invalid email or password', (done) => {
    const invalidLoginData = {
      email: 'nonexistent@example.com',
      password: 'invalidpassword1111',
    };
    request(app)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(invalidLoginData)
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Invalid email or password');
        done();
      });
  });

  it('responds with a 400 status code on invalid input', (done) => {
    const invalidLoginData = {
      email: 'user@example.com',
    };

    request(app)
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(invalidLoginData)
      .expect(400, done);
  });
});


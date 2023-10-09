import app from '../src/app';
import {postUser} from './userFunctions';
import {UserTest} from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    password: 'testpassword',
  };

  const adminUser: UserTest = {
    username: 'Test User ' + randomstring.generate(7),
    password: '12345',
  };

  it('should create a new user', async () => {
    await postUser(app, testUser);
  });
});

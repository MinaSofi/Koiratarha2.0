import app from '../src/app';
import {
    postUser,
    loginUser,
    putUser,
    deleteUser,
    getUser,
    getSingleUser,
} from './userFunctions';
import { UserTest } from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';

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
    username: 'Admin Tester',
    password: '12345',
  };

  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

//   it('should create a new admin', async () => {
//     await postUser(app, adminUser);
//   });

//   it('should create second user', async () => {
//     await postUser(app, testUser2);
//   });

  it('should login user', async () => {
    userData = await loginUser(app, testUser);
  });

  it('should login admin', async () => {
    adminData = await loginUser(app, adminUser);
  });

  it('should update user', async () => {
    await putUser(app, userData.token!);
  });

  it('token should have role', async () => {
    const dataFromToken = jwt.verify(
      userData.token!,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('role');
  });

  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  it('should return array of users', async () => {
    await getUser(app);
  });

  it('should delete a user as admin', async () => {
    await deleteUser(app, userData.user.id!, adminData.token!);
  });

});

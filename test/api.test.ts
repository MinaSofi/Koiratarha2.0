import app from '../src/app';
import {
    postUser,
    loginUser,
    putUser,
    deleteUser,
    getUsers,
    getSingleUser,
    wrongUserDeleteUser
} from './userFunctions';
import { 
  postFavourite,
  getLocations,
  getLocationsByUser,
  deleteLocation,
  wrongUserDeleteLocation
} from './favLocFunctions';
import {
  postNotification,
  getNotificationsByUser,
  wrongUserDeleteNotification,
  deleteNotification
} from './notificationFunctions';
import { UserTest } from '../src/interfaces/User';
import mongoose from 'mongoose';
import {getNotFound} from './testFunctions';
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import { FavLocTest } from '../src/interfaces/FavouriteLocation';
import { NotificationTest } from '../src/interfaces/Notification';



describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

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
    username: 'Test User 2 ' + randomstring.generate(7),
    password: 'testtest',
  };

  const adminUser: UserTest = {
    username: 'Admin Tester',
    password: '12345',
  };

  const favLocData1: FavLocTest = {
    locName: 'Test Location ' + randomstring.generate(7),
    address: 'Testikatu 1',
    city: 'Testinki',
  }

  const favLocData2: FavLocTest = {
    locName: 'Test Location ' + randomstring.generate(7),
    address: 'Testikatu 2',
    city: 'Testinki',
  }

  const noteData1: NotificationTest = {
    locName: favLocData1.locName + ' Notification',
    time: new Date(),
  }

  const noteData2: NotificationTest = {
    locName: favLocData1.locName + ' Notification 2',
    time: new Date(),
  }

  it('should create 1st user', async () => {
    await postUser(app, testUser);
  });

  it('should create 2nd user', async () => {
    await postUser(app, testUser2);
  });

  it('should login 1st user', async () => {
    userData = await loginUser(app, testUser);
  });

  it('should login 2nd user', async () => {
    userData2 = await loginUser(app, testUser2);
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
    await getUsers(app);
  });

  let loc1ID: string;
  it('should post 1st favourite location', async () => {
    const loc1 = await postFavourite(app, favLocData1, userData.token!);
    loc1ID = loc1.id!;
  });

  let loc2ID: string;
  it('should post 2nd favourite location', async () => {
    const loc2 = await postFavourite(app, favLocData2, userData.token!);
    loc2ID = loc2.id!
  });

  let note1ID: string;
  it('should post 1st notification', async () => {
    const note1 = await postNotification(app, noteData1, userData.token!);
    note1ID = note1.id!;
  });

  let note2ID: string;
  it('should post 2nd notification', async () => {
    const note2 = await postNotification(app, noteData2, userData.token!);
    note2ID = note2.id!;
  });

  it('should return array of locations', async () => {
    await getLocations(app);
  });

  it('should return locations by current user', async () => {
    await getLocationsByUser(app, userData.user.id!);
  });

  it('should return notifications by current user', async () => {
    await getNotificationsByUser(app, userData.user.id!);
  });

  it('should not delete 1st favourite location as wrong user', async () => {
    await wrongUserDeleteLocation(app, loc1ID, userData2.token!);
  });

  it('should not delete 1st notification as wrong user', async () => {
    await wrongUserDeleteNotification(app, note1ID, userData2.token!);
  });

  it('should delete 1st favourite location as correct user', async () => {
    await deleteLocation(app, loc1ID, userData.token!);
  });

  it('should delete 2nd favourite location as correct user', async () => {
    await deleteLocation(app, loc2ID, userData.token!);
  });

  it('should delete 1st notification as correct user', async () => {
    await deleteNotification(app, note1ID, userData.token!);
  });

  it('should delete 2nd notification as correct user', async () => {
    await deleteNotification(app, note2ID, userData.token!);
  });

  it('should fail to delete a user as user', async () => {
    await wrongUserDeleteUser(app, userData.user.id!, userData.token!);
  });

  it('should delete 1st user as admin', async () => {
    await deleteUser(app, userData.user.id!, adminData.token!);
  });

  it('should delete 2nd user as admin', async () => {
    await deleteUser(app, userData2.user.id!, adminData.token!);
  });

});

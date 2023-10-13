import { NotificationTest } from "../src/interfaces/Notification";
import request from 'supertest';
import expect from 'expect';

const postNotification = (
    url: string | Function,
    notification: NotificationTest,
    token: string
): Promise<NotificationTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `mutation AddNotification($locName: String!, $time: DateTime!) {
            addNotification(loc_name: $locName, time: $time) {
              id
              loc_name
              time
            }
          }`,
          variables: notification,
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newNotification = response.body.data.addNotification;
            expect(newNotification).toHaveProperty('id');
            expect(newNotification.loc_name).toBe(notification.locName);
            expect(newNotification.time).toBe(notification.time?.toISOString());
            expect(newNotification).toHaveProperty('time');
            resolve(newNotification);
          }
        });
    });
};

const getNotificationsByUser = (
  url: string | Function,
  id: string
): Promise<NotificationTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query NotificationsByUser($userId: ID!) {
          notificationsByUser(userId: $userId) {
            loc_name
            time
            id
          }
        }`,
        variables: {
          userId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const note = response.body.data.notificationsByUser;
          note.forEach((note: NotificationTest) => {
            expect(note).toHaveProperty('id');
            expect(note).toHaveProperty('loc_name');
            expect(note).toHaveProperty('time');
          });
          resolve(note);
        }
      });
  });
};

const deleteNotification = (
  url: string | Function,
  id: string,
  token: string
): Promise<NotificationTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteNotification($deleteNotificationId: ID!) {
          deleteNotification(id: $deleteNotificationId) {
              id
          }
        }`,
        variables: {
          deleteNotificationId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedNote = response.body.data.deleteNotification;
          expect(deletedNote.id).toBe(id);
          resolve(deletedNote);
        }
      });
  });
};

const wrongUserDeleteNotification = (
  url: string | Function,
  id: string,
  token: string
): Promise<NotificationTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
          query: `mutation DeleteNotification($deleteNotificationId: ID!) {
              deleteNotification(id: $deleteNotificationId) {
                  id
              }
            }`,
          variables: {
            deleteNotificationId: id,
          },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedNote = response.body.data.deleteNotification;
          expect(deletedNote).toBe(null);
          resolve(deletedNote);
        }
      });
  });
};

export {postNotification, getNotificationsByUser, wrongUserDeleteNotification, deleteNotification};
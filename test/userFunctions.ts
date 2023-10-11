import {UserTest} from '../src/interfaces/User';
// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
// eslint-disable-next-line node/no-extraneous-import
import expect from 'expect';
import LoginMessageResponse from "../src/interfaces/LoginMessageResponse";
import randomstring from "randomstring";

const postUser = (
  url: string | Function,
  user: UserTest
): Promise<UserTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation CreateUser($user: UserInput!) {
                    createUser(user: $user) {
                        message
                        data {
                            id
                            username
                        }
                    }
                }`,
        variables: {
          user: {
            username: user.username,
            password: user.password,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.createUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('data');
          expect(userData.data).toHaveProperty('id');
          expect(userData.data.username).toBe(user.username);
          resolve(response.body.data.createUser);
        }
      });
  });
};

const loginUser = (
  url: string | Function,
  user: UserTest
): Promise<LoginMessageResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              message
              token
              user {
                id
                username
              }
            }
          }`,
        variables: {
          username: user.username,
          password: user.password,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          console.log('login response', response.body);
          const userData = response.body.data.login;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('token');
          expect(userData).toHaveProperty('user');
          expect(userData.user).toHaveProperty('id');
          expect(userData.user.username).toBe(user.username);
          resolve(response.body.data.login);
        }
      });
  });
};

const putUser = (url: string | Function, token: string) => {
  return new Promise((resolve, reject) => {
    const newName = 'UusArvo';
    const newPassword = 'UusSalasana';
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation UpdateUser($user: UserInput!) {
            updateUser(user: $user) {
              message
              data {
                id
                username
              }
            }
          }`,
        variables: {
          user: {
            username: newName,
            password: newPassword,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const userData = response.body.data.updateUser;
          expect(userData).toHaveProperty('message');
          expect(userData).toHaveProperty('data');
          expect(userData.data).toHaveProperty('id');
          expect(userData.data.username).toBe(newName);
          resolve(response.body.data.updateUser);
        }
      });
  });
};

export {postUser, loginUser, putUser};

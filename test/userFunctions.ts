import {UserTest} from '../src/interfaces/User';
import request from 'supertest';
import expect from 'expect';

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

export {postUser};

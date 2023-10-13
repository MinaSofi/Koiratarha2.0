import { FavLocTest } from "../src/interfaces/FavouriteLocation";
import request from 'supertest';
import expect from 'expect';


const postFavourite = (
    url: string | Function,
    location: FavLocTest,
    token: string
): Promise<FavLocTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `mutation AddFavourite($locName: String!, $address: String!, $city: String!) {
            addFavourite(loc_name: $locName, address: $address, city: $city) {
              id
              loc_name
              address
              city
            }
          }`,
          variables: location,
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const newLocation = response.body.data.addFavourite;
            expect(newLocation).toHaveProperty('id');
            expect(newLocation.loc_name).toBe(location.locName);
            expect(newLocation.address).toBe(location.address);
            expect(newLocation).toHaveProperty('city');
            resolve(newLocation);
          }
        });
    });
};

const getLocations = (url: string | Function): Promise<FavLocTest[]> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `query Query {
            favourites {
              id
              loc_name
              address
              city
            }
          }`,
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const favourites = response.body.data.favourites;
            expect(favourites).toBeInstanceOf(Array);
            favourites.forEach((favourite: FavLocTest) => {
              expect(favourite).toHaveProperty('id');
              expect(favourite).toHaveProperty('loc_name');
              expect(favourite).toHaveProperty('address');
              expect(favourite).toHaveProperty('city');
            });
            resolve(favourites);
          }
        });
    });
};

const getLocationsByUser = (
    url: string | Function,
    id: string
): Promise<FavLocTest[]> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .send({
          query: `query FavouritesByUser($userId: ID!) {
            favouritesByUser(userId: $userId) {
              address
              loc_name
              city
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
            const locations = response.body.data.favouritesByUser;
            locations.forEach((location: FavLocTest) => {
              expect(location).toHaveProperty('id');
              expect(location).toHaveProperty('loc_name');
              expect(location).toHaveProperty('address');
              expect(location).toHaveProperty('city');
            });
            resolve(locations);
          }
        });
    });
};

const deleteLocation = (
    url: string | Function,
    id: string,
    token: string
): Promise<FavLocTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          query: `mutation DeleteLocation($deleteFavouriteId: ID!) {
            deleteFavourite(id: $deleteFavouriteId) {
              id
            }
          }`,
          variables: {
            deleteFavouriteId: id,
          },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const deletedLocation = response.body.data.deleteFavourite;
            expect(deletedLocation.id).toBe(id);
            resolve(deletedLocation);
          }
        });
    });
};

const wrongUserDeleteLocation = (
    url: string | Function,
    id: string,
    token: string
): Promise<FavLocTest> => {
    return new Promise((resolve, reject) => {
      request(url)
        .post('/graphql')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            query: `mutation DeleteLocation($deleteFavouriteId: ID!) {
                deleteFavourite(id: $deleteFavouriteId) {
                    id
                }
                }`,
                variables: {
                deleteFavouriteId: id,
                },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const deletedLoc = response.body.data.deleteFavourite;
            expect(deletedLoc).toBe(null);
            resolve(deletedLoc);
          }
        });
    });
};

export {postFavourite, getLocations, getLocationsByUser, deleteLocation, wrongUserDeleteLocation};
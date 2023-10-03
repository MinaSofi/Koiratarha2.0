import fetchData from '../../functions/fetchData';
// import {Animal} from '../../interfaces/Animal';
import AuthMessageResponse from '../../interfaces/AuthMessageResponse';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import {User} from '../../interfaces/User';

export default {
//   Animal: {
//     owner: async (parent: Animal) => {
//       console.log(parent);
//       const user = await fetchData<AuthMessageResponse>(
//         `${process.env.AUTH_URL}/users/${parent.owner}`
//       );
//       return user.data;
//     },
//   },
  Query: {
    users: async () => {
      const users = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users`
      );
      console.log(users);
      return users.data;
    },
  },
  Mutation: {
    login: async (
      _parent: undefined,
      args: {email: string; password: string}
    ) => {
      console.log('login:', args);
      const options: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(args),
      };

      const user = await fetchData<LoginMessageResponse>(
        `${process.env.AUTH_URL}/auth/login`,
        options
      );

      return user;
    },
    createUser: async (
      _parent: undefined,
      args: {user: Omit<User, 'role'>}
    ) => {
      const options: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(args.user),
      };

      const user = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users`,
        options
      );

      return user;
    },
  },
};
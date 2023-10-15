import fetchData from '../../functions/fetchData';
import AuthMessageResponse from '../../interfaces/AuthMessageResponse';
import LoginMessageResponse from '../../interfaces/LoginMessageResponse';
import {User, UserIdWithToken} from '../../interfaces/User';

export default {
  Query: {
    users: async () => {
      const users = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users`
      );
      console.log(users);
      return users.data;
    },
    userById: async (_parent: undefined, args: {id: string}) => {
      const user = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users/${args.id}`
      );
      return user.data;
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
    checkToken: async (
      _parent: undefined,
      args: {},
      context: UserIdWithToken
    ) => {
      if (!context.id) {
        throw new Error('User not authenticated');
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (context.token) {
        headers.Authorization = `Bearer ${context.token}`;
      }

      const options: RequestInit = {
        method: 'GET',
        headers: headers,
      };

      const user = await fetchData<LoginMessageResponse>(
        `${process.env.AUTH_URL}/users/token`,
        options
      );
      console.log(user);
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
      console.log(user);

      return user;
    },
    updateUser: async (
      _parent: undefined,
      args: {user: Omit<User, 'role'>},
      context: UserIdWithToken
    ) => {
      if (!context.id) {
        throw new Error('User not authenticated');
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (context.token) {
        headers.Authorization = `Bearer ${context.token}`;
      }

      const options: RequestInit = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(args.user),
      };

      const updatedUser = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users`,
        options
      );

      return updatedUser;
    },
    deleteUser: async (
      _parent: undefined,
      args: {id: string},
      context: UserIdWithToken
    ) => {
      if (!context.id) {
        throw new Error('User not authenticated');
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (context.token) {
        headers.Authorization = `Bearer ${context.token}`;
      }

      const options: RequestInit = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(args),
      };

      const deletedUser = await fetchData<AuthMessageResponse>(
        `${process.env.AUTH_URL}/users/admin/${args.id}`,
        options
      );

      return deletedUser;
    },
  },
};

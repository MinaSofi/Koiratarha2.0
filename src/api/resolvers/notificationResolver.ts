import {GraphQLError} from 'graphql';
import {Notification} from '../../interfaces/Notification';
import {UserIdWithToken} from '../../interfaces/User';
import notificationModel from '../models/notificationModel';

export default {
  Query: {
    notifications: async () => {
      return await notificationModel.find();
    },
  },
  Mutation: {
    addNotification: async (
      _parent: undefined,
      args: Notification,
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.user_id = user.id;
      const note = new notificationModel(args);
      return await note.save();
    },
    deleteFavourite: async (_parent: undefined, args: {id: string}) => {
      return await notificationModel.findByIdAndDelete(args.id);
    },
  },
};

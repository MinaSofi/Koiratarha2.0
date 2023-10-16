import {GraphQLError} from 'graphql';
import {Notification} from '../../interfaces/Notification';
import {UserIdWithToken} from '../../interfaces/User';
import notificationModel from '../models/notificationModel';

export default {
  Query: {
    notifications: async () => {
      return await notificationModel.find();
    },
    notificationsByUser: async (_: undefined, args: {userId: string}) => {
      const user = await notificationModel.find({user_id: args.userId});

      return user;
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
    deleteNotification: async (
      _parent: undefined,
      args: {id: string},
      user: UserIdWithToken
    ) => {
      const notification = await notificationModel.findById(args.id);

      if (!notification) {
        throw new Error('Notification not found');
      }

      if (user.id !== notification.user_id.toString()) {
        throw new Error('User not authorized');
      }

      return await notificationModel.findByIdAndDelete(args.id);
    },
  },
};

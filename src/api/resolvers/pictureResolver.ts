import {GraphQLError} from 'graphql';
import {Picture} from '../../interfaces/Picture';
import {UserIdWithToken} from '../../interfaces/User';
import pictureModel from '../models/pictureModel';

export default {
  Query: {
    pictures: async () => {
      return await pictureModel.find();
    },
    pictureById: async (_parent: undefined, args: {id: string}) => {
      return await pictureModel.findById(args.id);
    },
    picturesByUser: async (_parent: undefined, args: {id: string}) => {
      return await pictureModel.find({owner: args.id});
    },
  },
  Mutation: {
    addPicture: async (
      _parent: undefined,
      args: Picture,
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }

      //not yet implemented
      //return await picture.save();
    },
    updatePicture: async (
      _parent: undefined,
      args: Picture,
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await pictureModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deletePicture: async (
      _parent: undefined,
      args: {id: string},
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      return await pictureModel.findByIdAndDelete(args.id);
    },
  },
};

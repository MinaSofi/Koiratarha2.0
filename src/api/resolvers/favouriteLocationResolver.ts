import {GraphQLError} from 'graphql';
import {FavouriteLocation} from '../../interfaces/FavouriteLocation';
import {UserIdWithToken} from '../../interfaces/User';
import favouriteLocationModel from '../models/favouriteLocationModel';

export default {
  Query: {
    favourites: async () => {
      return await favouriteLocationModel.find();
    },
  },
  Mutation: {
    addFavourite: async (
      _parent: undefined,
      args: FavouriteLocation,
      user: UserIdWithToken
    ) => {
      if (!user.id) {
        throw new GraphQLError('Not authorized', {
          extensions: {code: 'NOT_AUTHORIZED'},
        });
      }
      args.user_id = user.id;
      const favLoc = new favouriteLocationModel(args);
      return await favLoc.save();
    },
    deleteFavourite: async (_parent: undefined, args: {id: string}) => {
      return await favouriteLocationModel.findByIdAndDelete(args.id);
    },
  },
};

import { Schema, model } from 'mongoose';
import { FavouriteLocation } from '../../interfaces/FavouriteLocation';

const favouriteLocationSchema = new Schema<FavouriteLocation>({
    loc_name: {
        type: String,
        required: true,
        minlength: 2
    },
    address: {
        type: String,
        minlength: 2
    },
    city: {
        type: String,
        minlength: 2
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model<FavouriteLocation>('FavouriteLocation', favouriteLocationSchema);
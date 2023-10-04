import { Document, Types } from "mongoose";

interface FavouriteLocation extends Document {
    loc_name: string;
    address: string;
    city: string;
    user_id: Types.ObjectId | string;
}

export {FavouriteLocation};
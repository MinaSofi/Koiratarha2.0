import { Document, Types } from "mongoose";

interface Notification extends Document {
    loc_name: string;
    time: Date;
    user_id: Types.ObjectId | string;
}

export {Notification};
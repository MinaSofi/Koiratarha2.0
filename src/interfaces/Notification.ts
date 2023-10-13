import { Document, Types } from "mongoose";

interface Notification extends Document {
    loc_name: string;
    time: Date;
    user_id: Types.ObjectId | string;
}

interface NotificationTest {
    id?: string,
    loc_name?: string;
    locName?: string;
    time?: Date;
    user_id?: Types.ObjectId | string;
}

export {Notification, NotificationTest};
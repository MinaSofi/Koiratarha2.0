import {Document, Types} from 'mongoose';

interface Picture extends Document {
  title: string;
  picture_name: string;
  user_id: Types.ObjectId | string;
}

export {Picture};

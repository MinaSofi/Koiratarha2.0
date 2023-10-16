import {Schema, model} from 'mongoose';
import {Picture} from '../../interfaces/Picture';

const pictureSchema = new Schema<Picture>({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  picture_name: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model<Picture>('Picture', pictureSchema);

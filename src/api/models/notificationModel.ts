import {Schema, model} from 'mongoose';
import {Notification} from '../../interfaces/Notification';

const notificationSchema = new Schema<Notification>({
  loc_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  time: {
    type: Date,
    required: true,
    min: Date.now(),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model<Notification>('Notification', notificationSchema);

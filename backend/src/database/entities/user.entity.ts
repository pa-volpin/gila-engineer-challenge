import mongoose, { model } from 'mongoose';
import { User } from '../../interfaces/user';
import { EnumMessageCategories } from '../../interfaces/messageTypes';
import { EnumNotificationTypes } from '../../interfaces/notificationTypes';

const Schema = mongoose.Schema;

const userSchema = new Schema<User>({
  name: { type: String, required: true, trim: true, uppercase: true, unique: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  phone: { type: String },
  subscribed: [{ type: String, enum: EnumMessageCategories, required: true }],
  channels: [{ type: String, enum: EnumNotificationTypes, required: true }],
}, {
  timestamps: true
});

// userSchema.plugin(mongooseKeywords, { paths: ['name', 'email'] });

const UserEntity = model<User>('Users', userSchema);

export const schema = UserEntity.schema
export default UserEntity;
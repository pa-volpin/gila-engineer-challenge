import mongoose, { model } from 'mongoose';
import { EnumNotificationTypes } from '../../interfaces/notificationTypes';
import { EnumMessageCategories } from '../../interfaces/messageTypes';
import { Log } from '../../interfaces/log';

const Schema = mongoose.Schema;

interface ExtendedLog extends Omit<Log, 'user'> {
  user: mongoose.Schema.Types.ObjectId
}

const logSchema = new Schema<ExtendedLog>({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  messageCategory: { type: String, enum: EnumMessageCategories, required: true },
  channel: { type: String, enum: EnumNotificationTypes, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true
});

const LogEntity = model<ExtendedLog>('Logs', logSchema);

export const schema = LogEntity.schema
export default LogEntity;
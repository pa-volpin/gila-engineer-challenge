import { EnumMessageCategories } from "./messageTypes";
import { EnumNotificationTypes } from "./notificationTypes";

export interface Log {
  _id: string;
  user: string;
  messageCategory: EnumMessageCategories;
  channel: EnumNotificationTypes;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
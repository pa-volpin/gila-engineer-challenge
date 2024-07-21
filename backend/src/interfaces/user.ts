import { EnumMessageCategories } from "./messageTypes";
import { EnumNotificationTypes } from "./notificationTypes";

export interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  channels: EnumNotificationTypes[];
  subscribed: EnumMessageCategories[];
  createdAt: Date;
  updatedAt: Date;
}
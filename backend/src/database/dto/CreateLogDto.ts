import { EnumMessageCategories } from "../../interfaces/messageTypes";
import { EnumNotificationTypes } from "../../interfaces/notificationTypes";

export interface CreateLogDto {
  user: string;
  messageCategory: EnumMessageCategories;
  channel: EnumNotificationTypes;
  message: string;
}
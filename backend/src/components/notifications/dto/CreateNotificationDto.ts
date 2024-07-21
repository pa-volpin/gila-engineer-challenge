import { EnumMessageCategories } from "../../../interfaces/messageTypes";
import { EnumNotificationTypes } from "../../../interfaces/notificationTypes";

export interface CreateNotificationDto {
  messageCategory: EnumMessageCategories;
  channel: EnumNotificationTypes;
}
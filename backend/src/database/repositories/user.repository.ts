import { GetUsersBySubscriptionDto } from "../dto/GetUsersBySubscriptionDto";
import UserEntity from "../entities/user.entity"

export class UserRepository {
  entity = UserEntity;

  constructor() {}

  async findBySubscription(params: GetUsersBySubscriptionDto) {
    const { messageCategory } = params;

    return await UserEntity.find({ subscribed: messageCategory })
  }
}
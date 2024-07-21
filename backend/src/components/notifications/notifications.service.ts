import { UserRepository } from '../../database/repositories/user.repository';
import { LogRepository } from '../../database/repositories/log.repository';
import { EnumMessageCategories } from '../../interfaces/messageTypes';


export async function getLogsService(page: number, limit: number, order: 'asc' | 'desc', orderBy: string) {
  const logRepository = new LogRepository();

  const { count, rows } = await logRepository.findAll({ page, limit, order, orderBy })

  return ({ count, rows });
}

export async function notifyUsersService(messageCategory: EnumMessageCategories, message: string) {
  const userRepository = new UserRepository();
  const logRepository = new LogRepository();

  const users = await userRepository.findBySubscription({ messageCategory })

  const notifications: Promise<any>[] = [];

  users.forEach((user) => {
    const userId = user._id.toString();

    const channels = user.channels;

    const userNotifications = channels.map(async (channel) => await logRepository.create({ channel, messageCategory, user: userId, message }));

    notifications.push(...userNotifications);
  })

  await Promise.all(notifications);
}

export async function deleteLogsService() {
  const logRepository = new LogRepository();

  await logRepository.deleteAll();
}
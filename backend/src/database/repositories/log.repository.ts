import { CreateLogDto } from "../dto/CreateLogDto";
import { GetLogsQueryDto } from "../dto/GetLogsQueryDto";
import LogEntity from "../entities/log.entity"

export class LogRepository {
  entity = LogEntity;

  constructor() {}

  async findAll(queryParams: GetLogsQueryDto) {
    const { page = 1, limit = 10, orderBy = 'createdAt', order = 'desc' } = queryParams;

    const rows = await LogEntity.find({}).sort(`${order === 'asc' ? '' : '-'}${orderBy}`).skip((page - 1) * limit).limit(limit).populate('user');
    const count = await LogEntity.countDocuments();

    return ({ rows, count });
  }

  async create(body: CreateLogDto) {
    const result = await LogEntity.create(body);
    return result
  }

  async deleteAll() {
    const result = await LogEntity.deleteMany({});
    return result.deletedCount;
  }
}
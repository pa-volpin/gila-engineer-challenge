export interface GetLogsQueryDto {
  page?: number;
  limit?: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
}
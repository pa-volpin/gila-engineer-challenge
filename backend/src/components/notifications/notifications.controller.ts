import * as express from 'express'
import { EnumMessageCategories } from '../../interfaces/messageTypes';
import { deleteLogsService, getLogsService, notifyUsersService } from './notifications.service';

const router = express.Router();

router.get('/logs', async (req: express.Request, res: express.Response) => {
  try {
    const query = req.query;

    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = query.limit ? parseInt(query.limit as string) : 10;
    const order = query.order ? query.order as 'asc' | 'desc' : 'asc';
    const orderBy = query.page ? query.orderBy as string : 'createdAt';

    const result = await getLogsService(page, limit, order, orderBy);

    return res.status(200).json(result);
  } catch(error) {
    return res.status(500).json({ message: 'Internal error' })
  }
})

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body

    const messageCategory = body.category as EnumMessageCategories;
    const message = body.message as string;

    if (!messageCategory || !(message && message.length > 0)) {
      return res.status(400).json({ message: 'Bad request, invalid body' })
    }

    await notifyUsersService(messageCategory, message);

    return res.status(201).json({ message: 'Success' });
  } catch(error) {
    return res.status(500).json({ message: 'Internal error' })
  }
})

router.delete('/logs', async (req: express.Request, res: express.Response) => {
  try {
    await deleteLogsService();

    return res.status(200).json({ message: 'Success' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' })
  }
})

export default router;
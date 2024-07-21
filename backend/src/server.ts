import { connectDatabase } from "./database/connectDatabase";
import express from 'express'
import notificationController from './components/notifications/notifications.controller';

connectDatabase()

const app = express();


// CORS middleware
const allowCrossDomain = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};


app.use(express.json())
app.use(allowCrossDomain);

app.use('/notifications', notificationController)

const PORT = 8080;

app.listen(8080, () => `Sever running on port ${PORT}`)
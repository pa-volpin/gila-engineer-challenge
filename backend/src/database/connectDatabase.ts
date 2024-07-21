import mongoose from "mongoose";

export function connectDatabase() {
  const mongoForTest =  "mongodb+srv://paulovolpin:Wr15fBKySeJPTHgj@gila-test.7mfk23p.mongodb.net/?retryWrites=true&w=majority&appName=gila-test"
  const mongoURL = process.env.MONGO_URI as string || mongoForTest;

  mongoose.set("strictQuery", false)

  mongoose.connect(mongoURL)
    .then(() => console.log('Database connected!'))
    .catch(error => console.error(error))

  mongoose.Promise = global.Promise;
}
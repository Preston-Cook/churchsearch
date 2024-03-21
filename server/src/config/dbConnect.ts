import mongoose from 'mongoose';

export default function dbConnect(): void {
  const { CONNECTION_STR, DB_USERNAME, DB_PASSWORD } = process.env;

  const DB_URI = (CONNECTION_STR as string)
    .replace('<USERNAME>', DB_USERNAME as string)
    .replace('<PASSWORD>', DB_PASSWORD as string);

  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log('Established Connection to Database');
    })
    .catch(err => {
      console.log(err.message);
      process.exit(1);
    });
}

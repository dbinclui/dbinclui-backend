/* eslint-disable no-console */
import mongoose from 'mongoose';

export default function configMongoDB() {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => {
      console.log('Falha de acesso ao BD:');
      console.error(err);
    });
}

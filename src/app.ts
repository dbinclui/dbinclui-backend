import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log('Conectado ao MongoDb'))
  .catch((err) => {
    console.log('Falha de acesso ao BD:');
    console.error(err);
  });

export default app;

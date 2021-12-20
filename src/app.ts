import express from 'express';
import mongoose from 'mongoose';

export const app = express();

mongoose
  .connect(process.env.MONGO_URL || 'test')
  .then(() => console.log('Conectado ao MongoDb'))
  .catch((err) => {
    console.log('Falha de acesso ao BD:');
    console.error(err);
  });

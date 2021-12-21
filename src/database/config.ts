import mongoose from 'mongoose';

import debug from './../debugConfig';

export default function configMongoDB() {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => debug.db(`Conectado ao banco de dados em ${process.env.MONGO_URL}`))
    .catch((err) => {
      debug.db('Falha de acesso ao banco de dados');
      debug.db(err);
    });
}

import express from 'express';
import configMongoDB from './database/config';

configMongoDB();

<<<<<<< HEAD
const app = express();

export default app;
=======
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Conectado ao MongoDb'))
  .catch((err) => {
    console.log('Falha de acesso ao BD:');
    console.error(err);
  });
>>>>>>> 82e57a223521136156df41683d149ca618c2fef3

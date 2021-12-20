import express from 'express';
import configMongoDB from './database/config';

configMongoDB();

<<<<<<< HEAD
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
=======
const app = express();

export default app;
>>>>>>> 48e3d595f60b1e8a2b3caccf8171e2c56e816f6e

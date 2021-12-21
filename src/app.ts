import express from 'express';
import { json } from 'body-parser';
import router from './app/routes/routes';

<<<<<<< HEAD
const app = express();

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log('Conectado ao MongoDb'))
  .catch((err) => {
    console.log('Falha de acesso ao BD:');
    console.error(err);
  });
=======
import configMongoDB from './database/config';

configMongoDB();

const app = express();

app.use(router);
app.use(json());
>>>>>>> e9a37f5221616fa89d59eb774477e090ae13f153

export default app;

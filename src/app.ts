import express from 'express';
import { json } from 'body-parser';
import router from './app/routes/routes';

import configMongoDB from './database/config';

configMongoDB();

const app = express();

app.use(router);
app.use(json());

export default app;

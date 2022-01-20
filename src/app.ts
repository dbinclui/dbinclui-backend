import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import router from '@routes/routes';
import configMongoDB from './database/config';

configMongoDB();

const app = express();

app.use(cors());
app.use(json());
app.use('/', router);

export default app;

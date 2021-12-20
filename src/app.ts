import express from 'express';
import configMongoDB from './database/config';

configMongoDB();

const app = express();

export default app;

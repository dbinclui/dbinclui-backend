import express from 'express';
import configMongoDB from './database/config';

configMongoDB();

export const app = express();

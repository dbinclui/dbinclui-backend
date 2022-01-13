import path from 'path';
import dotenv from 'dotenv';

const isProductionMode = () => process.env.NODE_ENV && process.env.NODE_ENV === 'production';
const envFile = isProductionMode() ? ['..', '..', '.env.prod'] : ['..', '.env.dev'];
const pathEnvFile = path.resolve(__dirname, ...envFile);

dotenv.config({
  path: pathEnvFile,
});

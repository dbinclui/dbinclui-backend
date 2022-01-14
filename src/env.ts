import path from 'path';
import dotenv from 'dotenv';

export const isHerokuLocal = () =>
  process.env.NODE_HOME && /(heroku)/gi.test(process.env.NODE_HOME);

export const isProductionMode = () => process.env.NODE_ENV && process.env.NODE_ENV === 'production';

export default (() => {
  if (isHerokuLocal()) {
    return;
  }
  const envFile = isProductionMode() ? ['..', '..', '.env.prod'] : ['..', '.env.dev'];
  const pathEnvFile = path.resolve(__dirname, ...envFile);
  dotenv.config({
    path: pathEnvFile,
  });
})();

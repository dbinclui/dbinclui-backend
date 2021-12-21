import debug from 'debug';

const appName = 'db-inclui';

export default {
  server: debug(`${appName}:server`),
  db: debug(`${appName}:db`),
  env: debug(`${appName}:env`),
};

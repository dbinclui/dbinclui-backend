import { json } from 'body-parser';
import { app } from './app';
import router from './app/routes/routes';

app.use(router);
app.use(json());

app.listen(3000, () => {
  console.log('servidor rodando');
});

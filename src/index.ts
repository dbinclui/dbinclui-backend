import './env';
import app from './app';

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`servidor rodando na porta ${process.env.PORT || 3000}`);
});

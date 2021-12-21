<<<<<<< HEAD
=======
import './env';
>>>>>>> e9a37f5221616fa89d59eb774477e090ae13f153
import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`servidor rodando na porta ${PORT}`);
});

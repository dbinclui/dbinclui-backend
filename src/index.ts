import './env';
import debug from './debugConfig';
import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debug.server(`servidor rodando na porta ${PORT}`);
});

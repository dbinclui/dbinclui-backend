import './env';
import { serverDebug } from './debugConfig';
import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  serverDebug(`servidor rodando na porta ${PORT}`);
});

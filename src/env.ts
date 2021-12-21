import path from 'path';
import dotenv from 'dotenv';

import debug from './debugConfig';

(() => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
    debug.env(`
    Variável de ambiente NODE_ENV não está definida corretamente, 'environments/.env.dev' será utilizado como default.
    Certifique-se que a variável NODE_ENV está definida como 'development' ou 'production' na sua máquina.
    Para mais informações, veja: https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
    `);
  }

  try {
    const enviromentFileName = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
    const result = dotenv.config({
      path: path.resolve(process.cwd(), 'environments', enviromentFileName),
    });

    if (result.error) {
      throw result.error;
    }
  } catch {
    debug.env(`
        Ocorreu um erro ao carregar o arquivo contendo as variáveis de ambiente.
        Confirme que a pasta enviroments está na raiz do projeto e contém os arquivos necessários. 
      `);
  }
})();

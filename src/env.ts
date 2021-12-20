/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';

(() => {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development') {
    console.error(`
    Variável de ambiente NODE_ENV não está definida corretamente.
    Certifique-se que a variável NODE_ENV está definida como 'development' ou 'production' na sua máquina.
    Para mais informações, veja: https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
  `);
    return;
  }

  const enviromentFileName = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';

  try {
    const result = dotenv.config({
      path: path.resolve(process.cwd(), 'environments', enviromentFileName),
    });

    if (result.error) {
      throw result.error;
    }
  } catch {
    console.error(`
        Ocorreu um erro ao carregar o arquivo contendo as variáveis de ambiente.
        Confirme que a pasta enviroments está na raiz do projeto e contém os arquivos necessários. 
      `);
  }
})();

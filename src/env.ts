/* eslint-disable no-console */
import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  try {
    const result = dotenv.config({
      path: path.resolve(process.cwd(), 'environments', '.env.dev'),
    });

    if (result.error) {
      throw result.error;
    }
  } catch {
    console.error(`
      Ocorreu um erro ao configurar o caminho para o arquivo '.env.dev'.
      Confirme que a pasta enviroments está configurada na raiz do projeto contendo o arquivo '.env.dev'. 
    `);
  }
} else if (process.env.NODE_ENV === 'production') {
  try {
    const result = dotenv.config({
      path: path.resolve(process.cwd(), 'environments', '.env.prod'),
    });

    if (result.error) {
      throw result.error;
    }
  } catch {
    console.error(`
      Ocorreu um erro ao configurar o caminho para o arquivo '.env.prod'.
      Confirme que a pasta enviroments está configurada na raiz do projeto contendo o arquivo '.env.prod'. 
    `);
  }
} else {
  console.error(`
    Variável de ambiente NODE_ENV não está definida corretamente.
    Certifique-se que a variável NODE_ENV está definida como 'development' ou 'production' na sua máquina.
    Para mais informações, veja: https://stackoverflow.com/questions/11104028/why-is-process-env-node-env-undefined
  `);
}

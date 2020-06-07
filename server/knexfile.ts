//Configurações que a conexão com o BD não tem:
//Arquivo q possibilita a execução das migrations (Necessário para criar as tabelas)

import path from 'path';

module.exports = {
  client: 'sqlite3', //BD utilizado (npm i sqlite3)
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'), //Onde vamos armazenar o o arquivo do BD (caminho)
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
}

/*
  Após criar esse arquivo criar o seguinte comando no package.json:

  "scripts": {
    "dev": "ts-node-dev src/server.ts",
    "knex:migrate": "knex --knexfile knexfile.ts migrate:latest"
  },

  e rodar em seguda o comando p/ gerar as tabelas: npm run knex:migrate
*/

/*
  Após criar esse arquivo criar o seguinte comando no package.json:

"scripts": {
    "dev": "ts-node-dev src/server.ts",
    "knex:seed": "knex --knexfile knexfile.ts seed:run",
    "knex:migrate": "knex --knexfile knexfile.ts migrate:latest"
  },

  e rodar em seguda o comando p/ gerar as tabelas: npm run knex:seed
*/

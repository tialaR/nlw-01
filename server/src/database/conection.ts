//Arquivo responsável pela conexão com o banco

import knex from 'knex';
import path from 'path'; //Lib que vem por padrão no node p/ lhe dar com caminhos na aplicação (padroniza caminhos para acesso a algum arquivo)

//Configurações do BD (conexão com BD):
const connection = knex({
  client: 'sqlite3', //BD utilizado (npm i sqlite3)
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite') //Onde vamos armazenar o o arquivo do BD (caminho)
  },
  useNullAsDefault: true,
})
//__dirname => Retorna o diretório no qual o arquivo em questão está;

export default connection;
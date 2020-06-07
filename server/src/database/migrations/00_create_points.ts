/* MIGRATIONS => São o histórico (controle de versão do BD) => Arquivo que determina
o que precisa ser feito/realizado dentro do BD quando uma versão especifica do 
software for executada => Servem pata Editar/Criar/Deletar tabelas */

import Knex from 'knex'; // Para se referir a tipagem usamos letra maiuscula
//Realiza as alterações que precisamos no BD:

export async function up(knex: Knex) {
    //CRIAR A TABELA
  return knex.schema.createTable('points', table => {
    table.increments('id').primary(); //ID (autoincrementavel a cada registro) de cada registro na tabela;
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
}; 

export async function down(knex: Knex) {
  //VOLTAR ATRÁS (DELETAR A TABELA)
  return knex.schema.dropTable('points');
};
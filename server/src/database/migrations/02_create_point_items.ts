import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary(); 
    
    /*O campo point_id vai criar uma chave estrangeira na tabela points no campo id,
      ou seja, todo point_id que esteja dentro dessa tabela precisa ser um id 
      válido dentro da tabela points */
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
}; 

export async function down(knex: Knex) {
  return knex.schema.dropTable('point_items');
};
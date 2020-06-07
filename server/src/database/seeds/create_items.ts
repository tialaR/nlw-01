import Knex from 'knex';

/* Quando precisamos que a nossa aplicação vá ao ar com algo já
pré estabelecido/configurações utilizamos o seeds (popular a base de 
dados com algums dados padrões) */

//Inserindo items na tabela de items (inserindo elementos default)
export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos .svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ])
}
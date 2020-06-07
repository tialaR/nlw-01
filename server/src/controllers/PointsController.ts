import { Request, Response } from 'express';
import knex from '../database/conection';

class PointsController {

//Listar pontos de coleta:
async index(request: Request, response: Response) {
  const { city, uf, items } = request.query;

  const parsedItems = String(items).split(',').map(item => Number(item.trim()));

  //Procura todos os pontos onde tem pelo menos um dos items buscados:
  const points = await knex('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

    //Trnasformando os dados para quem está requisitando as informações (serialização):
    //Mudando a resposta da requisição:
    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
      };
    }); 

    return response.json(serializedPoints);
}

//Listar um único ponto de coleta:
  async show(request: Request, response: Response) {
    //Identificar o ponto buscado:
    const { id } = request.params;

    //Buscar o ponto de coleta:
    const point  = await knex('points').where('id', id).first();
    //O método first() retorna um único registro

    if(!point) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    //Trnasformando os dados para quem está requisitando as informações (serialização):
    //Mudando a resposta da requisição:
    const serializedPoint = { 
        ...point,
        image_url: `http://192.168.0.6:3333/uploads/${point.image}`,
    }; 

    //Buscar todos items que tem relação com o ponto de coleta buscado
    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title');
      /*
       join('point_items', 'items.id', '=', 'point_items.item_id')
        => Esse join busca na tabela point_items e na tabela items o item com id igual 
        a point_items.item_id

        where('point_items.point_id', id);
        => buscando id passado pela rota
      */

    return response.json({ point: serializedPoint, items });

  }

//Cadastrando (criando) pontos de coleta:
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    //Transaction garante que se a execução de uma query falhar a outra não irá executar:
    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
  
    //Criando ponto no BD:
    /*
    => Quando criamos um registro(insert) no BD, esse mesmo registro 
    retorna um id (nesse caso insertedIds é o id de retorno do registro) 
    => cada registro vai retornar um array com um id
    */
    const insertedIds = await trx('points').insert(point);
  
    const point_id = insertedIds[0];
  
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
      return {
        item_id,
        point_id,
      }
    });
  
    await trx('point_items').insert(pointItems);

    //Permitindo que o transection faça os inserts na base de dados:
    await trx.commit();

    return response.json({ 
      point_id,
      ...point,
     });
  }
}

export default PointsController;

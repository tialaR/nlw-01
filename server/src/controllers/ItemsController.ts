import { Request, Response } from 'express';
import knex from '../database/conection';

//Listando Items:
class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    //Trnasformando os dados para quem está requisitando as informações (serialização):
    //Mudando a resposta da requisição:
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.6:3333/uploads/${item.image}`,
      };
    }); 
  
    return response.json(serializedItems);
  }
}

export default ItemsController;

//Arquivo responsável por estabelecer as rotas da aplicação:

import { celebrate, Joi } from 'celebrate';
import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

/* 
Padrões de nomes métodos utilizados no controller:
index => Listagem
show => mostrar um único item
create => criar 
update => atualizar
delete => deletar 
*/

const routes = express.Router();
const upload = multer(multerConfig); //Upload de imagens

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Listagem de items:
routes.get('/items', itemsController.index);

//Listar pontos de coleta:
routes.get('/points', pointsController.index);
//Listar um ponto de coleta específico:
routes.get('/points/:id', pointsController.show);

//Cadastrando pontos de coleta:
routes.post(
  '/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false,
  }),
  pointsController.create);

export default routes;

import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';
 
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(routes);

/*
Criando rota para acessar os arquivos estáticos (nesse caso as imagens) da aplicação:

express.static() => É uma função do express que viabilizará o acesso a
arquivos estáticos de forma direta (de uma pasta específica). 
ex: arquivos de imagem, pdf, worl, para download

uso: http://localhost:3333/uploads/lampadas.svg => gerou a url da imagem
*/
app.use('/uploads',  express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);

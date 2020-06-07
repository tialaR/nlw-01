import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

/*O multer foi utilizado para possibilitar o upload de imagens na aplicação (ele definiu onde será
armazenada a imagem e qual nome a mesma receberá)*/

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'), //Onde será armazenado os arquivos envados pelo usuário.
    filename(request, file, callback) { //Estabelece o nome que será dado ao arquivo(gerar um nome único p/ cada arquivo)
      const hash = crypto.randomBytes(6).toString('hex'); //Gera varios caracteres aleatórios 

      const fileName = `${hash}-${file.originalname}`; //Definindo o nome

      callback(null, fileName);
    } 
  })
};

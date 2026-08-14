import dotenv from 'dotenv';
import crearApp from './app.js';

dotenv.config();

const puerto = process.env.PORT || 4000;
const entorno = process.env.NODE_DEV || 'development';

const app = crearApp();

app.listen(puerto, () => {
  console.log(`[servidor] entorno=${entorno} escuchando en puerto ${puerto}`);
});
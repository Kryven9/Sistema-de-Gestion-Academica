import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import rutas from './routes/index.js';
import manejoErrores from './middleware/manejoErrores.js';

export default function crearApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_DEV === 'development') {
    app.use(morgan('dev'));
  }

  app.get('/healt', (req, res) => {
    res.json({ estado: 'ok', servicio: 'sga-backend' });
  });

  app.use('/api', rutas);

  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  app.use(manejoErrores);

  return app;
}

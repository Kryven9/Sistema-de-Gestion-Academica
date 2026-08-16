import express from 'express';
import crearComposicion from '../composicion.js';
import crearRutasAuth from './auth.js';
import crearRutasUsuarios from './usuarios.js';

const router = express.Router();
const composicion = crearComposicion();

router.get('/', (req, res) => {
  res.json({ mensaje: 'API del Sistema de Gestion Academica' });
});

router.use('/auth', crearRutasAuth(composicion));
router.use('/usuarios', crearRutasUsuarios(composicion));

export default router;

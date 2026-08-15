import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ mensaje: 'API del Sistema de Gestion Academica' });
});

export default router;

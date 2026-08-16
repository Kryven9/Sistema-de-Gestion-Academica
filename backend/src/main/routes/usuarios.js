import express from 'express';
import UsuarioController from '../../interface-adapters/controllers/UsuarioController.js';
import { crearAutenticacion, requiereRol } from '../middleware/autenticacion.js';
import { validarRegistro } from '../../interface-adapters/validators/autenticacionValidator.js';

export default function crearRutasUsuarios(composicion) {
  const router = express.Router();
  const autenticacion = crearAutenticacion({ ...composicion, ...composicion.repositorios });
  const controller = new UsuarioController(
    composicion.casos,
    composicion.repositorios.usuarioRepository,
  );
  router.use(autenticacion, requiereRol('ADMINISTRADOR'));
  router.get('/', controller.listar);
  router.post('/', validarRegistro, controller.registrar);
  router.patch('/:id', controller.modificar);
  router.patch('/:id/desactivar', controller.desactivar);
  return router;
}

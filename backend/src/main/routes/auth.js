import express from 'express';
import AuthController from '../../interface-adapters/controllers/AuthController.js';
import { validarCredenciales } from '../../interface-adapters/validators/autenticacionValidator.js';
import { crearAutenticacion } from '../middleware/autenticacion.js';

export default function crearRutasAuth(composicion) {
  const router = express.Router();
  const controller = new AuthController(composicion.casos);
  const autenticacion = crearAutenticacion({ ...composicion, ...composicion.repositorios });
  router.post('/login', validarCredenciales, controller.iniciarSesion);
  router.post('/logout', autenticacion, controller.cerrarSesion);
  router.post('/recuperacion', controller.solicitarRecuperacion);
  router.post('/restablecer', controller.restablecer);
  return router;
}

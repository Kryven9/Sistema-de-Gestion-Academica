import { ErrorAplicacion } from '../errores.js';

export default class ModificarUsuario {
  constructor({ usuarioRepository }) {
    this.usuarioRepository = usuarioRepository;
  }
  async ejecutar({ id, nombre, correo }) {
    const existente = await this.usuarioRepository.buscarPorId(id);
    if (!existente) throw new ErrorAplicacion('Usuario no encontrado', 404);
    if (correo && correo.toLowerCase() !== existente.correo) {
      const repetido = await this.usuarioRepository.buscarPorCorreo(correo);
      if (repetido && repetido.id !== id)
        throw new ErrorAplicacion('El correo ya está registrado', 409);
    }
    return this.usuarioRepository.actualizar(id, { nombre, correo });
  }
}

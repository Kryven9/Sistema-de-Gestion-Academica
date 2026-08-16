import { ErrorAplicacion } from '../errores.js';
export default class DesactivarUsuario {
  constructor({ usuarioRepository, authRepository }) {
    Object.assign(this, { usuarioRepository, authRepository });
  }
  async ejecutar({ id }) {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario) throw new ErrorAplicacion('Usuario no encontrado', 404);
    await this.usuarioRepository.actualizar(id, { activo: false });
    await this.authRepository.revocarSesionesUsuario(id);
  }
}

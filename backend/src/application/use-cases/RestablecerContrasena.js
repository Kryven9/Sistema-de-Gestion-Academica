import { ErrorAplicacion } from '../errores.js';
export default class RestablecerContrasena {
  constructor({ authRepository, usuarioRepository, hash, tokensRecuperacion }) {
    Object.assign(this, { authRepository, usuarioRepository, hash, tokensRecuperacion });
  }
  async ejecutar({ token, contrasena }) {
    if (!contrasena || contrasena.length < 8)
      throw new ErrorAplicacion('La contraseña debe tener al menos 8 caracteres');
    const hashToken = this.tokensRecuperacion.resumir(token);
    const solicitud = await this.authRepository.buscarSolicitudRecuperacion(hashToken);
    if (!solicitud || solicitud.usadoEn || solicitud.expiraEn <= new Date())
      throw new ErrorAplicacion('El token no es válido o ha expirado');
    await this.usuarioRepository.actualizar(solicitud.idUsuario, {
      contrasenaHash: await this.hash.generar(contrasena),
    });
    await this.authRepository.marcarSolicitudUsada(solicitud.id);
    await this.authRepository.revocarSesionesUsuario(solicitud.idUsuario);
  }
}

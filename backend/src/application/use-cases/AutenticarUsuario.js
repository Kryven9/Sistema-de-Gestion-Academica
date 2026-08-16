import { noAutorizado } from '../errores.js';

export default class AutenticarUsuario {
  constructor({ usuarioRepository, authRepository, hash, tokens }) {
    Object.assign(this, { usuarioRepository, authRepository, hash, tokens });
  }

  async ejecutar({ correo, contrasena }) {
    const usuario = await this.usuarioRepository.buscarPorCorreo(correo);
    if (
      !usuario ||
      !usuario.activo ||
      !(await this.hash.comparar(contrasena, usuario.contrasenaHash))
    )
      throw noAutorizado('Correo o contraseña incorrectos');
    const token = this.tokens.firmar({});
    await this.authRepository.crearSesion({
      id: this.tokens.idSesion(token),
      idUsuario: usuario.id,
      expiraEn: this.tokens.expiracion(token),
    });
    return { token, usuario };
  }
}

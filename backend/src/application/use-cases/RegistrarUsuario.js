import { ErrorAplicacion } from '../errores.js';
import Usuario from '../../domain/entities/Usuario.js';

export default class RegistrarUsuario {
  constructor({ usuarioRepository, hash }) {
    this.usuarioRepository = usuarioRepository;
    this.hash = hash;
  }

  async ejecutar({ nombre, correo, contrasena, rol, matricula }) {
    if (!contrasena || contrasena.length < 8)
      throw new ErrorAplicacion('La contraseña debe tener al menos 8 caracteres');
    if (await this.usuarioRepository.buscarPorCorreo(correo))
      throw new ErrorAplicacion('El correo ya está registrado', 409);
    const usuario = new Usuario({
      nombre,
      correo,
      rol,
      activo: true,
      contrasenaHash: await this.hash.generar(contrasena),
    });
    return this.usuarioRepository.guardar(usuario, { matricula });
  }
}

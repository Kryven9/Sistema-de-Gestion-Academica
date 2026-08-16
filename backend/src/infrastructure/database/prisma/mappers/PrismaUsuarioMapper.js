import Usuario from '../../../../domain/entities/Usuario.js';

export default class PrismaUsuarioMapper {
  static aDominio(registro) {
    if (!registro) return null;
    return new Usuario({
      id: registro.id,
      nombre: registro.nombre,
      correo: registro.correo,
      contrasenaHash: registro.contrasenaHash,
      rol: registro.rol,
      activo: registro.activo,
    });
  }
}

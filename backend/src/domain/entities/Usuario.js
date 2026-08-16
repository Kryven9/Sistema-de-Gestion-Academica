export const ROLES = Object.freeze(['ADMINISTRADOR', 'PROFESOR', 'ESTUDIANTE']);

export default class Usuario {
  constructor({ id, nombre, correo, contrasenaHash, rol, activo = true }) {
    if (!nombre || nombre.trim().length < 2)
      throw new Error('El nombre debe tener al menos 2 caracteres');
    if (!correo || !/^\S+@\S+\.\S+$/.test(correo)) throw new Error('El correo no es válido');
    if (!ROLES.includes(rol)) throw new Error('El rol no es válido');
    this.id = id;
    this.nombre = nombre.trim();
    this.correo = correo.trim().toLowerCase();
    this.contrasenaHash = contrasenaHash;
    this.rol = rol;
    this.activo = activo;
  }

  desactivar() {
    this.activo = false;
  }
}

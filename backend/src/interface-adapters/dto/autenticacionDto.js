import { ErrorAplicacion } from '../../application/errores.js';

function obligatorio(valor, nombre) {
  if (typeof valor !== 'string' || !valor.trim())
    throw new ErrorAplicacion(`${nombre} es obligatorio`);
  return valor.trim();
}

export function crearLoginDto(body = {}) {
  return {
    correo: obligatorio(body.correo, 'El correo').toLowerCase(),
    contrasena: obligatorio(body.contrasena, 'La contraseña'),
  };
}

export function crearRegistroDto(body = {}) {
  const rol = obligatorio(body.rol, 'El rol').toUpperCase();
  const dto = {
    nombre: obligatorio(body.nombre, 'El nombre'),
    correo: obligatorio(body.correo, 'El correo').toLowerCase(),
    contrasena: obligatorio(body.contrasena, 'La contraseña'),
    rol,
  };
  if (rol === 'ESTUDIANTE') {
    if (!Number.isInteger(body.matricula) || body.matricula <= 0)
      throw new ErrorAplicacion('La matrícula es obligatoria para estudiantes');
    dto.matricula = body.matricula;
  }
  return dto;
}

export function crearRecuperacionDto(body = {}) {
  return { correo: obligatorio(body.correo, 'El correo').toLowerCase() };
}
export function crearRestablecimientoDto(body = {}) {
  return {
    token: obligatorio(body.token, 'El token'),
    contrasena: obligatorio(body.contrasena, 'La contraseña'),
  };
}
export function crearModificacionUsuarioDto(body = {}, id) {
  return { id, nombre: body.nombre?.trim(), correo: body.correo?.trim().toLowerCase() };
}

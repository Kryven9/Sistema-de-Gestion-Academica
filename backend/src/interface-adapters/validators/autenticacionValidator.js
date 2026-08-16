import { crearLoginDto, crearRegistroDto } from '../dto/autenticacionDto.js';

export function validarCredenciales(req, _res, next) {
  try {
    req.dto = crearLoginDto(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

export function validarRegistro(req, _res, next) {
  try {
    req.dto = crearRegistroDto(req.body);
    next();
  } catch (error) {
    next(error);
  }
}

import { noAutorizado, prohibido } from '../../application/errores.js';

export function crearAutenticacion({ tokens, authRepository }) {
  return async (req, _res, next) => {
    try {
      const encabezado = req.headers.authorization || '';
      if (!encabezado.startsWith('Bearer ')) throw noAutorizado();
      const datos = tokens.verificar(encabezado.slice(7));
      const sesion = await authRepository.buscarSesion(datos.jti);
      if (!sesion || sesion.revocadaEn || sesion.expiraEn <= new Date() || !sesion.usuario.activo)
        throw noAutorizado();
      req.usuario = { id: sesion.usuario.id, rol: sesion.usuario.rol, idSesion: sesion.id };
      next();
    } catch (error) {
      next(error.estado ? error : noAutorizado());
    }
  };
}

export function requiereRol(...roles) {
  return (req, _res, next) => (roles.includes(req.usuario?.rol) ? next() : next(prohibido()));
}

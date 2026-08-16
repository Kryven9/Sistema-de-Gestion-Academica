export class ErrorAplicacion extends Error {
  constructor(mensaje, estado = 400) {
    super(mensaje);
    this.estado = estado;
    this.exponerMensaje = true;
  }
}

export const noAutorizado = (mensaje = 'No autorizado') => new ErrorAplicacion(mensaje, 401);
export const prohibido = (mensaje = 'No tiene permisos para esta operación') =>
  new ErrorAplicacion(mensaje, 403);

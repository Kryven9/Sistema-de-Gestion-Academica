// Middleware global de manejo de errores. Captura cualquier excepcion
// lanzada en controladores o capas internas y la traduce a JSON

export default function manejoErrores(error, req, res, next) {
  const estado = error.estado || 500;
  const mensaje = error.exponerMensaje
    ? error.message
    : 'Error interno del servidor';

  if (estado >= 500) {
    console.error('[error]', error);
  }

  res.status(estado).json({
    error: mensaje,
    ...(process.env.NODE_DEV === 'development' && { detalle: error.message })
  });
}
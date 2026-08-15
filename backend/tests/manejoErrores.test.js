import { describe, it, expect, vi } from 'vitest';
import manejoErrores from '../src/main/middleware/manejoErrores.js';

function crearResMock() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
}

describe('middleware manejoErrores', () => {
  it('responde 500 con mensaje generico cuando el error no expone detalles', () => {
    process.env.NODE_DEV = 'production';
    const req = {};
    const res = crearResMock();
    const next = vi.fn();
    const error = new Error('detalle interno');

    manejoErrores(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
  });

  it('incluye el detalle del error cuando NODE_DEV es development', () => {
    process.env.NODE_DEV = 'development';
    const req = {};
    const res = crearResMock();
    const next = vi.fn();
    const error = new Error('detalle visible');

    manejoErrores(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error interno del servidor',
      detalle: 'detalle visible',
    });
  });

  it('respeta el estado http que el error declare', () => {
    process.env.NODE_DEV = 'production';
    const error = new Error('no autorizado');
    error.estado = 401;
    error.exponerMensaje = true;

    const res = crearResMock();
    manejoErrores(error, {}, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'no autorizado' });
  });
});

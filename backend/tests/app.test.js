import { describe, it, expect } from 'vitest';
import request from 'supertest';
import crearApp from '../src/main/app.js';

describe('servidor backend', () => {
  it('GET /healt responde 200 con estado ok', async () => {
    const app = crearApp();
    const respuesta = await request(app).get('/healt');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      estado: 'ok',
      servicio: 'sga-backend',
    });
  });

  it('GET /api responde 200 con mensaje del sistema', async () => {
    const app = crearApp();
    const respuesta = await request(app).get('/api');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.mensaje).toBeDefined();
  });

  it('ruta inexistente responde 404', async () => {
    const app = crearApp();
    const respuesta = await request(app).get('/ruta/inexistente');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Ruta no encontrada' });
  });
});

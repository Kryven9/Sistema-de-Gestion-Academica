import axios from 'axios';

const cliente = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

cliente.interceptors.request.use((configuracion) => {
  const sesion = JSON.parse(localStorage.getItem('sga_sesion') || 'null');
  if (sesion?.token) configuracion.headers.Authorization = `Bearer ${sesion.token}`;
  return configuracion;
});

async function solicitar(ruta, opciones = {}) {
  try {
    const respuesta = await cliente({ url: ruta, ...opciones });
    return respuesta.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'No se pudo completar la solicitud');
  }
}

export const api = {
  iniciarSesion: (correo, contrasena) =>
    solicitar('/auth/login', { method: 'post', data: { correo, contrasena } }),
  cerrarSesion: () => solicitar('/auth/logout', { method: 'post' }),
  solicitarRecuperacion: (correo) =>
    solicitar('/auth/recuperacion', { method: 'post', data: { correo } }),
  restablecerContrasena: (token, contrasena) =>
    solicitar('/auth/restablecer', { method: 'post', data: { token, contrasena } }),
  listarUsuarios: () => solicitar('/usuarios'),
  registrarUsuario: (datos) => solicitar('/usuarios', { method: 'post', data: datos }),
  modificarUsuario: (id, datos) => solicitar(`/usuarios/${id}`, { method: 'patch', data: datos }),
  desactivarUsuario: (id) => solicitar(`/usuarios/${id}/desactivar`, { method: 'patch' }),
};

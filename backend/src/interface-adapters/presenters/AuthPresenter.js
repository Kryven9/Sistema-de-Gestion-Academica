import { presentarUsuario } from './UsuarioPresenter.js';

export function presentarSesion(resultado) {
  return { token: resultado.token, usuario: presentarUsuario(resultado.usuario) };
}

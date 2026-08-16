import instanciaPrisma from '../infrastructure/database/prisma/clientePrisma.js';
import PrismaUsuarioRepository from '../infrastructure/repositories/PrismaUsuarioRepository.js';
import PrismaAuthRepository from '../infrastructure/repositories/PrismaAuthRepository.js';
import HashContrasenas from '../infrastructure/auth/HashContrasenas.js';
import TokensJwt from '../infrastructure/auth/TokensJwt.js';
import NotificadorConsola from '../infrastructure/auth/NotificadorConsola.js';
import TokensRecuperacion from '../infrastructure/auth/TokensRecuperacion.js';
import RegistrarUsuario from '../application/use-cases/RegistrarUsuario.js';
import AutenticarUsuario from '../application/use-cases/AutenticarUsuario.js';
import CerrarSesion from '../application/use-cases/CerrarSesion.js';
import ModificarUsuario from '../application/use-cases/ModificarUsuario.js';
import DesactivarUsuario from '../application/use-cases/DesactivarUsuario.js';
import SolicitarRecuperacion from '../application/use-cases/SolicitarRecuperacion.js';
import RestablecerContrasena from '../application/use-cases/RestablecerContrasena.js';

export default function crearComposicion() {
  const usuarioRepository = new PrismaUsuarioRepository(instanciaPrisma);
  const authRepository = new PrismaAuthRepository(instanciaPrisma);
  const hash = new HashContrasenas();
  const tokens = new TokensJwt();
  const tokensRecuperacion = new TokensRecuperacion();
  const casos = {
    registrar: new RegistrarUsuario({ usuarioRepository, hash }),
    autenticar: new AutenticarUsuario({ usuarioRepository, authRepository, hash, tokens }),
    cerrar: new CerrarSesion({ authRepository }),
    modificar: new ModificarUsuario({ usuarioRepository }),
    desactivar: new DesactivarUsuario({ usuarioRepository, authRepository }),
    solicitar: new SolicitarRecuperacion({
      usuarioRepository,
      authRepository,
      notificador: new NotificadorConsola(),
      tokensRecuperacion,
    }),
    restablecer: new RestablecerContrasena({
      authRepository,
      usuarioRepository,
      hash,
      tokensRecuperacion,
    }),
  };
  return { repositorios: { usuarioRepository, authRepository }, casos, tokens };
}

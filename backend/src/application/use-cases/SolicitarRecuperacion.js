export default class SolicitarRecuperacion {
  constructor({ usuarioRepository, authRepository, notificador, tokensRecuperacion, horas = 1 }) {
    Object.assign(this, {
      usuarioRepository,
      authRepository,
      notificador,
      tokensRecuperacion,
      horas,
    });
  }
  async ejecutar({ correo }) {
    const usuario = await this.usuarioRepository.buscarPorCorreo(correo);
    if (!usuario || !usuario.activo) return;
    const { token, hash: tokenHash } = this.tokensRecuperacion.generar();
    await this.authRepository.crearSolicitudRecuperacion({
      idUsuario: usuario.id,
      tokenHash,
      expiraEn: new Date(Date.now() + this.horas * 3600000),
    });
    await this.notificador.enviar(usuario, token);
  }
}

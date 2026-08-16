export default class NotificadorConsola {
  async enviar(usuario, token) {
    if (process.env.NODE_DEV === 'development')
      console.log(`[recuperacion] usuario=${usuario.correo} token=${token}`);
  }
}

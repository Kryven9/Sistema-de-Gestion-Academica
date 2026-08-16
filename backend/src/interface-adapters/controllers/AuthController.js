import { crearRecuperacionDto, crearRestablecimientoDto } from '../dto/autenticacionDto.js';
import { presentarSesion } from '../presenters/AuthPresenter.js';

export default class AuthController {
  constructor(casos) {
    this.casos = casos;
  }
  iniciarSesion = async (req, res) =>
    res.json(presentarSesion(await this.casos.autenticar.ejecutar(req.dto)));
  cerrarSesion = async (req, res) => {
    await this.casos.cerrar.ejecutar({ idSesion: req.usuario.idSesion });
    res.status(204).send();
  };
  solicitarRecuperacion = async (req, res) => {
    await this.casos.solicitar.ejecutar(crearRecuperacionDto(req.body));
    res.json({
      mensaje:
        'Si el correo está registrado, recibirá instrucciones para restablecer la contraseña',
    });
  };
  restablecer = async (req, res) => {
    await this.casos.restablecer.ejecutar(crearRestablecimientoDto(req.body));
    res.json({ mensaje: 'Contraseña restablecida correctamente' });
  };
}

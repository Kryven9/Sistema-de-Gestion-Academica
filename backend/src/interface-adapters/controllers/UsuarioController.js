import { crearModificacionUsuarioDto } from '../dto/autenticacionDto.js';
import { presentarUsuario, presentarUsuarios } from '../presenters/UsuarioPresenter.js';

export default class UsuarioController {
  constructor(casos, repositorio) {
    this.casos = casos;
    this.repositorio = repositorio;
  }
  listar = async (_req, res) =>
    res.json({ usuarios: presentarUsuarios(await this.repositorio.listar()) });
  registrar = async (req, res) =>
    res.status(201).json(presentarUsuario(await this.casos.registrar.ejecutar(req.dto)));
  modificar = async (req, res) =>
    res.json(
      presentarUsuario(
        await this.casos.modificar.ejecutar(crearModificacionUsuarioDto(req.body, req.params.id)),
      ),
    );
  desactivar = async (req, res) => {
    await this.casos.desactivar.ejecutar({ id: req.params.id });
    res.status(204).send();
  };
}

export default class CerrarSesion {
  constructor({ authRepository }) {
    this.authRepository = authRepository;
  }
  async ejecutar({ idSesion }) {
    await this.authRepository.revocarSesion(idSesion);
  }
}

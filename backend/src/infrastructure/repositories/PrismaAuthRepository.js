import IAuthRepository from '../../domain/repositories/IAuthRepository.js';

export default class PrismaAuthRepository extends IAuthRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }
  crearSesion(datos) {
    return this.prisma.sesion.create({ data: datos });
  }
  buscarSesion(id) {
    return this.prisma.sesion.findUnique({ where: { id }, include: { usuario: true } });
  }
  revocarSesion(id) {
    return this.prisma.sesion.updateMany({
      where: { id, revocadaEn: null },
      data: { revocadaEn: new Date() },
    });
  }
  revocarSesionesUsuario(idUsuario) {
    return this.prisma.sesion.updateMany({
      where: { idUsuario, revocadaEn: null },
      data: { revocadaEn: new Date() },
    });
  }
  crearSolicitudRecuperacion(datos) {
    return this.prisma.solicitudRestablecimiento.create({ data: datos });
  }
  buscarSolicitudRecuperacion(tokenHash) {
    return this.prisma.solicitudRestablecimiento.findUnique({ where: { tokenHash } });
  }
  marcarSolicitudUsada(id) {
    return this.prisma.solicitudRestablecimiento.update({
      where: { id },
      data: { usadoEn: new Date() },
    });
  }
}

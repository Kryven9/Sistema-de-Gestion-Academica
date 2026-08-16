import PrismaUsuarioMapper from '../database/prisma/mappers/PrismaUsuarioMapper.js';
import IUsuarioRepository from '../../domain/repositories/IUsuarioRepository.js';

export default class PrismaUsuarioRepository extends IUsuarioRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }
  async buscarPorId(id) {
    return PrismaUsuarioMapper.aDominio(await this.prisma.usuario.findUnique({ where: { id } }));
  }
  async buscarPorCorreo(correo) {
    return PrismaUsuarioMapper.aDominio(
      await this.prisma.usuario.findUnique({ where: { correo: correo.toLowerCase() } }),
    );
  }
  async listar() {
    const registros = await this.prisma.usuario.findMany({
      orderBy: { nombre: 'asc' },
    });
    return registros.map(PrismaUsuarioMapper.aDominio);
  }
  async guardar(usuario, { matricula } = {}) {
    return PrismaUsuarioMapper.aDominio(
      await this.prisma.usuario.create({
        data: {
          nombre: usuario.nombre,
          correo: usuario.correo,
          contrasenaHash: usuario.contrasenaHash,
          rol: usuario.rol,
          activo: usuario.activo,
          ...(usuario.rol === 'ESTUDIANTE' ? { estudiante: { create: { matricula } } } : {}),
        },
      }),
    );
  }
  async actualizar(id, datos) {
    const data = Object.fromEntries(
      Object.entries(datos).filter(([, valor]) => valor !== undefined),
    );
    if (data.correo) data.correo = data.correo.toLowerCase();
    return PrismaUsuarioMapper.aDominio(await this.prisma.usuario.update({ where: { id }, data }));
  }
}

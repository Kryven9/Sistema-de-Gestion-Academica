import { describe, expect, it, vi } from 'vitest';
import AutenticarUsuario from '../src/application/use-cases/AutenticarUsuario.js';
import RegistrarUsuario from '../src/application/use-cases/RegistrarUsuario.js';
import { crearLoginDto, crearRegistroDto } from '../src/interface-adapters/dto/autenticacionDto.js';
import { presentarUsuario } from '../src/interface-adapters/presenters/UsuarioPresenter.js';

function usuario() {
  return {
    id: 'u-1',
    nombre: 'Ana',
    correo: 'ana@sga.edu',
    contrasenaHash: 'hash',
    rol: 'ADMINISTRADOR',
    activo: true,
  };
}

describe('casos de uso de autenticación', () => {
  it('autentica un usuario activo y no expone el hash', async () => {
    const usuarioRepository = { buscarPorCorreo: vi.fn().mockResolvedValue(usuario()) };
    const authRepository = { crearSesion: vi.fn() };
    const hash = { comparar: vi.fn().mockResolvedValue(true) };
    const tokens = {
      firmar: vi.fn().mockReturnValue('jwt'),
      idSesion: vi.fn().mockReturnValue('s-1'),
      expiracion: vi.fn().mockReturnValue(new Date()),
    };
    const caso = new AutenticarUsuario({ usuarioRepository, authRepository, hash, tokens });

    const resultado = await caso.ejecutar({ correo: 'ana@sga.edu', contrasena: 'secreta123' });

    expect(resultado.usuario.contrasenaHash).toBe('hash');
    expect(authRepository.crearSesion).toHaveBeenCalledWith(
      expect.objectContaining({ id: 's-1', idUsuario: 'u-1' }),
    );
    expect(presentarUsuario(resultado.usuario)).not.toHaveProperty('contrasenaHash');
  });

  it('rechaza credenciales inválidas', async () => {
    const caso = new AutenticarUsuario({
      usuarioRepository: { buscarPorCorreo: vi.fn().mockResolvedValue(null) },
      authRepository: {},
      hash: { comparar: vi.fn() },
      tokens: {},
    });

    await expect(
      caso.ejecutar({ correo: 'no@sga.edu', contrasena: 'incorrecta' }),
    ).rejects.toMatchObject({ estado: 401 });
  });

  it('registra un usuario con contraseña hasheada', async () => {
    const usuarioRepository = {
      buscarPorCorreo: vi.fn().mockResolvedValue(null),
      guardar: vi.fn().mockImplementation((dato) => dato),
    };
    const caso = new RegistrarUsuario({
      usuarioRepository,
      hash: { generar: vi.fn().mockResolvedValue('hash-seguro') },
    });

    const resultado = await caso.ejecutar(
      crearRegistroDto({
        nombre: 'Ana',
        correo: 'ANA@SGA.EDU',
        contrasena: 'secreta123',
        rol: 'ADMINISTRADOR',
      }),
    );

    expect(resultado.contrasenaHash).toBe('hash-seguro');
    expect(resultado.correo).toBe('ana@sga.edu');
  });

  it('valida y normaliza DTOs en el adaptador HTTP', () => {
    expect(crearLoginDto({ correo: ' ANA@SGA.EDU ', contrasena: 'secreta123' })).toEqual({
      correo: 'ana@sga.edu',
      contrasena: 'secreta123',
    });
    expect(() =>
      crearRegistroDto({
        nombre: 'Ana',
        correo: 'ana@sga.edu',
        contrasena: 'secreta123',
        rol: 'ESTUDIANTE',
      }),
    ).toThrow('matrícula');
  });
});

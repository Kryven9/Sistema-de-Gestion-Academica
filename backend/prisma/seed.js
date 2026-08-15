// Seed de datos iniciales para el SGA Universitario.
// Crea: 1 administrador, 1 profesor, 2 estudiantes, 1 carrera,
// 2 materias con un prerrequisito entre ellas, 1 periodo activo,
// 1 curso con cupo disponible
//
// Uso: npm run db:seed

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const CONTRASENA_POR_DEFECTO = 'Cambiar123!';
const SALTOS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

async function limpiar() {
  await prisma.auditoria.deleteMany();
  await prisma.calificacion.deleteMany();
  await prisma.entrega.deleteMany();
  await prisma.tarea.deleteMany();
  await prisma.inscripcion.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.materiaPrerrequisito.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.carrera.deleteMany();
  await prisma.periodo.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.usuario.deleteMany();
}

async function crearUsuarios() {
  const contrasenaHash = await bcrypt.hash(CONTRASENA_POR_DEFECTO, SALTOS);

  const administrador = await prisma.usuario.create({
    data: {
      nombre: 'Ana Administradora',
      correo: 'admin@sga.edu',
      contrasenaHash,
      rol: 'ADMINISTRADOR',
      activo: true,
    },
  });

  const profesor = await prisma.usuario.create({
    data: {
      nombre: 'Pedro Profesor',
      correo: 'profesor@sga.edu',
      contrasenaHash,
      rol: 'PROFESOR',
      activo: true,
    },
  });

  const estudiante1Usuario = await prisma.usuario.create({
    data: {
      nombre: 'Lucia Estudiante',
      correo: 'lucia@sga.edu',
      contrasenaHash,
      rol: 'ESTUDIANTE',
      activo: true,
    },
  });

  const estudiante2Usuario = await prisma.usuario.create({
    data: {
      nombre: 'Mario Estudiante',
      correo: 'mario@sga.edu',
      contrasenaHash,
      rol: 'ESTUDIANTE',
      activo: true,
    },
  });

  const estudiante1 = await prisma.estudiante.create({
    data: { idUsuario: estudiante1Usuario.id, matricula: 100001 },
  });

  const estudiante2 = await prisma.estudiante.create({
    data: { idUsuario: estudiante2Usuario.id, matricula: 100002 },
  });

  return { administrador, profesor, estudiante1, estudiante2 };
}

async function crearCarreraYMaterias() {
  const carrera = await prisma.carrera.create({
    data: {
      codigo: 'ING-SIS',
      nombre: 'Ingenieria de Sistemas',
    },
  });

  const materiaCalculo = await prisma.materia.create({
    data: {
      codigo: 'MAT-101',
      nombre: 'Calculo I',
      creditos: 4,
      idCarrera: carrera.id,
    },
  });

  const materiaFisica = await prisma.materia.create({
    data: {
      codigo: 'FIS-101',
      nombre: 'Fisica I',
      creditos: 4,
      idCarrera: carrera.id,
    },
  });

  // Fisica I requiere Calculo I aprobado.
  await prisma.materiaPrerrequisito.create({
    data: {
      idMateria: materiaFisica.id,
      idPrerrequisito: materiaCalculo.id,
    },
  });

  return { carrera, materiaCalculo, materiaFisica };
}

async function crearPeriodoYCurso(profesor, materiaCalculo) {
  const periodo = await prisma.periodo.create({
    data: {
      nombre: '2026-2',
      fechaInicio: new Date('2026-08-01'),
      fechaFin: new Date('2026-12-15'),
      activo: true,
    },
  });

  const curso = await prisma.curso.create({
    data: {
      idMateria: materiaCalculo.id,
      idPeriodo: periodo.id,
      idProfesor: profesor.id,
      cupoMaximo: 30,
      cupoDisponible: 30,
    },
  });

  return { periodo, curso };
}

async function principal() {
  console.log('[seed] Limpiando tablas...');
  await limpiar();

  console.log('[seed] Creando usuarios...');
  const { administrador, profesor, estudiante1, estudiante2 } = await crearUsuarios();

  console.log('[seed] Creando carrera y materias...');
  const { carrera, materiaCalculo, materiaFisica } = await crearCarreraYMaterias();

  console.log('[seed] Creando periodo y curso...');
  const { periodo, curso } = await crearPeriodoYCurso(profesor, materiaCalculo);

  console.log('');
  console.log('[seed] Datos de prueba creados:');
  console.log(`  Administrador: ${administrador.correo} / ${CONTRASENA_POR_DEFECTO}`);
  console.log(`  Profesor:      ${profesor.correo} / ${CONTRASENA_POR_DEFECTO}`);
  console.log(`  Estudiante 1:  ${estudiante1.idUsuario} (mat ${estudiante1.matricula})`);
  console.log(`  Estudiante 2:  ${estudiante2.idUsuario} (mat ${estudiante2.matricula})`);
  console.log(`  Carrera:       ${carrera.codigo}`);
  console.log(`  Materia:       ${materiaCalculo.codigo} (${creditos(materiaCalculo)})`);
  console.log(`  Materia:       ${materiaFisica.codigo} (prerreq: ${materiaCalculo.codigo})`);
  console.log(`  Periodo:       ${periodo.nombre} (activo: ${periodo.activo})`);
  console.log(`  Curso:         ${curso.id} (cupo ${curso.cupoDisponible}/${curso.cupoMaximo})`);
}

function creditos(m) {
  return m.creditos;
}

principal()
  .catch((error) => {
    console.error('[seed] Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

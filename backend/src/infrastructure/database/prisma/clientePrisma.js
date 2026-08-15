// Inicializa el cliente Prisma como singleton para evitar multiples
// instancias en desarrollo por recarga en caliente.

import { PrismaClient } from '@prisma/client';

const instanciaPrisma =
  globalThis.__instanciaPrisma ??
  new PrismaClient({
    log: process.env.NODE_DEV === 'development' ? ['error'] : ['query', 'warn', 'error'],
  });

if (process.env.NODE_DEV === 'development') {
  globalThis.__instanciaPrisma = instanciaPrisma;
}

export default instanciaPrisma;

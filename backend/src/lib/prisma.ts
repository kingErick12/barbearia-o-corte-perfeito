import { PrismaClient } from '@prisma/client';

// Evita a criação de múltiplas instâncias em ambiente de desenvolvimento (útil com reloaders como nodemon ou hot-reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Para visualizar as queries no console em dev
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

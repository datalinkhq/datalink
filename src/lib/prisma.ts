import { PrismaClient } from '@prisma/client';
/**
 * Prisma client with production mode.
 * @returns {PrismaClient} 
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
} // TODO: add development mode?

export default prisma;
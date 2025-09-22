import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// Ensure the prisma instance is re-used during hot-reloading
// Otherwise, a new instance will be created on every reload
// which can exhaust your database connection limits

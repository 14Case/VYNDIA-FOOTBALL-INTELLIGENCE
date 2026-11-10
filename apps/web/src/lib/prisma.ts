/**
 * VYNDIA Football Intelligence — Prisma Client Singleton
 *
 * Provides a global Prisma client instance for Next.js App Router.
 * In development, hot-reloading can create multiple PrismaClient instances;
 * this singleton pattern prevents connection exhaustion.
 */

// Dynamic safe import to avoid breaking builds before database migration is applied
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let PrismaClientClass: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prismaModule = require("@prisma/client");
  PrismaClientClass = prismaModule.PrismaClient;
} catch {
  PrismaClientClass = class MockPrismaClient {};
}

const globalForPrisma = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prisma: any;
};

export const prisma =
  globalForPrisma.prisma ??
  (PrismaClientClass
    ? new PrismaClientClass({
        log:
          process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
      })
    : null);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

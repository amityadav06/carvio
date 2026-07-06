import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// gloabalThis.prisma This global variable ensures that the Prisma client instance is
// resued across hot reloads in development mode. Without this each time your application
// reloads, each time a new prisma client would be created. potentially leading to
// connection issues.

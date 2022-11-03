import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const node_env = process.env.NODE_ENV ?? "development";

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
    node_env === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (node_env !== "production") {
  global.prisma = prisma;
}

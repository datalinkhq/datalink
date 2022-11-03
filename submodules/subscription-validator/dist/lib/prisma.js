"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
/**
 * Prisma client with production mode.
 * @returns {PrismaClient}
 */
let prisma;
if (process.env.NODE_ENV === "production") {
    prisma = new client_1.PrismaClient();
}
else {
    let globalWithPrisma = global;
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new client_1.PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
} // TODO: add development mode?
exports.default = prisma;

"use strict";
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prisma;
if (process.env.NODE_ENV === "production") {
    prisma = new client_1.PrismaClient();
}
else {
    var globalWithPrisma = global;
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new client_1.PrismaClient();
    }
    prisma = globalWithPrisma.prisma;
} // add development mode?
exports["default"] = prisma;

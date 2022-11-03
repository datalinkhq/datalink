"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
async function main(roid) {
    const data = await prisma_1.default.user.findFirst({
        where: {
            roid: roid
        }
    });
    if (data) {
        return data.isPremium;
    }
    else if (!data) {
        return "User does not exist.";
    }
}
exports.default = main;
// main(BigInt(213671823)).then(console.log)

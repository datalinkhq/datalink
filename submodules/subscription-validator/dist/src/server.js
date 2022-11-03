"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const validate_1 = __importDefault(require("../lib/validate"));
const app = (0, express_1.default)();
const port = 3000;
function main() {
    app.get('/api/userCreate', async (req, res) => {
        if (req.method == 'POST') {
            const body = req.body;
            const { id, status, secret } = body;
            if (id && status && secret) {
                if ((0, validate_1.default)(secret) == true) {
                    try {
                        await prisma_1.default.user.create({
                            data: {
                                roid: id,
                                isPremium: Boolean(status)
                            }
                        });
                    }
                    catch (e) {
                        console.log(e);
                        res.send({ status: 502, message: 'error' });
                    }
                    res.send({ status: 200, message: 'success' });
                }
            }
        }
        else {
            res.send({ status: 400, message: 'bad request' });
        }
    });
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    });
}
// main()
exports.default = main;

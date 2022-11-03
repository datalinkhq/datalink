import express from 'express';
import prisma from '../lib/prisma';
import validate from '../lib/validate';
const app = express()
const port = 3000

function main() {
    app.get('/api/userCreate', async (req, res) => {
        if (req.method == 'POST') {
            const body = req.body;
            const { id, status, secret } = body;
            if (id && status && secret) {
                if (validate(secret) == true) {
                    try {
                        await prisma.user.create({
                            data: {
                                roid: id,
                                isPremium: Boolean(status)
                            }
                        })
                    } catch (e) {
                        console.log(e)
                        res.send({ status: 502, message: 'error' });
                    }
                    res.send({ status: 200, message: 'success' });
                }
            }
        } else {
            res.send({ status: 400, message: 'bad request' });
        }
    })

    app.listen(port, () => {
        console.log(`Server listening on ${port}`)
    })
}

// main()

export default main
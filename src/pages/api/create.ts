// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../lib/setToken'
import fetchToken from '../../lib/fetchToken'
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { toNumber } from 'lodash'

type Data = {
    code: Number
    status: String
    id?: Number
    token?: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body;
    const { name } = body;
    let data = await prisma.user.findUnique({
        where: {
            token: `${await setToken(name.toString())}`
        }
    })
    if (name) {
        try {
            res.status(200).json({ code: 200, status: `success`, id: toNumber(data?.id), token: `${data?.token}` })
        } catch (e) {
            res.status(500).json({ code: 500, status: `error` })
        }
    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}
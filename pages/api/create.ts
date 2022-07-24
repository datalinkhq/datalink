// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../lib/setToken'
import validateToken from '../../lib/validateToken'
import { toNumber } from 'lodash'

type Data = {
    code: Number
    status: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = req.query;
    const { id, name, token } = query;
    if (name) {
        try {
            await setToken(name.toString())
            res.status(200).json({ code: 200, status: `success` })
        } catch (e) {
            res.status(500).json({ code: 500, status: `error` })
        }
    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}

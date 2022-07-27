// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../lib/fetchToken'
import { v4 as uuidv4 } from 'uuid';
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { toNumber } from 'lodash'
import { Data } from '../../lib/types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = req.body;
    const { id, token } = query;
    if (token && id) {
        if (await validateToken(toNumber(id), token.toString()) === true) {
            res.status(200).json({ code: 200, status: `Session Key OK` })
        } else if (await validateToken(toNumber(id), token.toString()) === false) {
            res.status(401).json({ code: 401, status: `Session Key Invalid` })
        }
    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}

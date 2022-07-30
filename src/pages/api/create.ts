// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../lib/setToken'
import fetchToken from '../../lib/fetchToken'
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { toNumber } from 'lodash'
import { Data } from '../../lib/types/types'
import { withSentry } from '@sentry/nextjs'

const handler = async function handler(
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
            res.status(200).json({ code: 200, status: `Success`, id: toNumber(data?.id), token: `${data?.token}` })
        } catch (e) {
            res.status(500).json({ code: 500, status: `Error` })
        }
    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}

export default withSentry(handler)
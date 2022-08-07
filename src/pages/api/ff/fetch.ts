// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../../lib/setToken'
import fetchToken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import prisma from '../../../lib/prisma'
import { toNumber } from 'lodash'
import { Flag } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateLogType'
import logEvent from '../../../lib/logEvent'
import fetchFlag from '../../../lib/fetchFlag'
import { toInteger } from 'lodash'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Flag>
) {
    const body = req.body;
    const { flagid, id, token } = body;
    if (flagid && id && token) {
        if (await validateToken(toNumber(id), token.toString()) === true) {
            try {
                const flag = await fetchFlag(toNumber(flagid));
                res.status(200).json({ code: 200, status: `Success`, flag })
            } catch (e) {
                res.status(500).json({ code: 500, status: `Error` })
            }
        } else {
            res.status(400).json({ code: 401, status: 'Unauthorized' })
        }
    } else {
        if (id && token) {
            if (await validateToken(toNumber(id), token.toString()) === true) {
                try {
                    const logs = await fetchFlag(id);
                    res.status(200).json({ code: 200, status: `Success`, logs })
                } catch (e) {
                    console.log(e)
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(400).json({ code: 401, status: 'Unauthorized' })
            }
        }
    }
}

export default withSentry(handler)
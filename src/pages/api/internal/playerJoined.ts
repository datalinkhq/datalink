// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../../lib/setToken'
import fetchToken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import prisma from '../../../lib/prisma'
import { toNumber } from 'lodash'
import { Player } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateLogType'
import logEvent from '../../../lib/logEvent'
import fetchLogs from '../../../lib/fetchLogs'
import { toInteger } from 'lodash'
import addPlayer from '../../../lib/addPlayer'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Player>
) {
    const body = req.body;
    const { id, token, accountId, accountAge, followedPlayer, followedFriend, premium, locale, region } = body;
    if (id && token && accountId && accountAge && followedPlayer && followedFriend && premium && locale && region) {
        if (await validateToken(toNumber(id), token.toString()) === true) {
            try {
                await addPlayer(accountId, accountAge, followedPlayer, followedFriend, premium, locale, region, 'playerJoined');
                res.status(200).json({ code: 200, status: `Success`, playerId: accountId })
            } catch (e) {
                res.status(500).json({ code: 500, status: `Error` })
            }
        } else {
            res.status(401).json({ code: 401, status: 'Unauthorized' })
        }
    }
}

export default withSentry(handler)
// $$$$$$$\             $$\               $$\ $$\           $$\       
// $$  __$$\            $$ |              $$ |\__|          $$ |      
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\ 
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  / 
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<  
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\ 
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|     

// Copyright (c) 2022 Datalink Contributors. All rights reserved.  

// This source code is licensed under the AGPL license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root 
// directory of this source tree.

import type { NextApiRequest, NextApiResponse } from 'next'
import setToken from '../../../lib/setToken'
import fetchToken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import prisma from '../../../lib/prisma'
import { Player } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateLogType'
import logEvent from '../../../lib/logEvent'
import fetchLogs from '../../../lib/fetchLogs'
import addPlayer from '../../../lib/addPlayer'
import { validatePlayerTypes } from '../../../lib/validateTypeZ'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Player>
) {
    const start = new Date().getMilliseconds()
    const body = req.body;
    const { id, token, accountId, accountAge, followedPlayer, followedFriend, premium, locale, region } = body;
    if (validatePlayerTypes("playerJoined", id, token, accountId, accountAge, followedFriend, followedFriend, premium, locale, region) === true) {
        if (id + token + accountId + accountAge + followedPlayer + followedFriend + premium + locale + region) {
            if (await validateToken(id as number, token as string) === true) {
                try {
                    await addPlayer(accountId, accountAge, followedPlayer, followedFriend, premium, locale, region, 'playerJoined');
                    res.status(200).json({ code: 200, status: `Success`, playerId: accountId })
                } catch (e) {
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(401).json({ code: 401, status: 'Unauthorized' })
            }
        } else {
            badRequest(req, res, new Date().getMilliseconds() - start)
        }
    }
}
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
import { toNumber } from 'lodash'
import { Log } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateLogType'
import logEvent from '../../../lib/logEvent'
import fetchLogs from '../../../lib/fetchLogs'
import { toInteger } from 'lodash'
import { validateInputLogTypes } from '../../../lib/validateTypeZ'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Log>
) {
    const start = new Date().getMilliseconds()
    const body = req.body;
    const { logid, id, token } = body;
    if (logid && id && token && validateInputLogTypes('fetch', id, token, undefined, undefined, undefined, logid)) {
        if (await validateToken(id as number, token as string) === true) {
            try {
                const logs = await fetchLogs(toNumber(logid));
                res.status(200).json({ code: 200, status: `Success`, logs })
            } catch (e) {
                res.status(500).json({ code: 500, status: `Error` })
            }
        } else {
            res.status(400).json({ code: 401, status: 'Unauthorized' })
        }
    } else if (id && token) {
        if (validateInputLogTypes('fetch', id, token, undefined, undefined, undefined, undefined)) {
            if (await validateToken(id as number, token as string) === true) {
                try {
                    const logs = await fetchLogs(id);
                    res.status(200).json({ code: 200, status: `Success`, logs })
                } catch (e) {
                    console.log(e)
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(400).json({ code: 401, status: 'Unauthorized' })
            }
        }
    } else {
        badRequest(req, res, new Date().getMilliseconds() - start)
    }
}
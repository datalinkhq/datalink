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
import { Flag } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import validate from '../../../lib/validateFloat'
import setFlag from '../../../lib/setFlag'
import { validateFastFlagTypes } from '../../../lib/validateTypeZ'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Flag>
) {
    const start = new Date().getMilliseconds()
    const body = req.body;
    const { id, token, flagid, name, value } = body;
    if (id && token && flagid && name && value && validateFastFlagTypes("set", id, token, flagid, name, value)) {
        if (await validateToken(id as number, token as string) === true) {
            if (await validate(value) === true) {
                try {
                    setFlag(name, value, flagid);
                    res.status(200).json({ code: 200, status: `Success`, flagId: flagid})
                } catch (e) {
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(400).json({ code: 400, status: 'Bad Request' })
            }
        } else {
            res.status(400).json({ code: 401, status: 'Unauthorized' })
        }
    } else {
        badRequest(req, res, new Date().getMilliseconds() - start)
    }
}
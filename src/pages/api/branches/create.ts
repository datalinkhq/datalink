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
import fetchtoken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import { toNumber, toInteger } from 'lodash'
import prisma from '../../../lib/prisma'
import { Branch, Data } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import { v4 as uuidv4 } from 'uuid';
import { validateBranchTypes } from '../../../lib/validateTypeZ'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Branch>
) {
    const start = new Date().getMilliseconds()
    const body = req.body;
    const { id, token, branchName } = body
    const headers = req.headers
    const placeId = headers['Roblox-Id']
    if (id && token && branchName && validateBranchTypes('create', id, token, branchName)) {
        if (await validateToken(id as number, token as string) === true) {
            try {
                let data = await prisma.branch.create({
                    data: {
                        assocId: id, 
                        placeId: BigInt(placeId as string | number | bigint | boolean),
                        name: branchName
                    }
                })
                res.status(200).json({ code: 200, status: `success`, BranchID: data?.id })

            } catch (e) {
                console.log("An error occured at /api/branches/create: ", e)
                res.status(500).json({ code: 500, status: `Error` })
            }
        } else {
            res.status(401).json({ code: 401, status: `Unauthorized` })
        }
    } else {
        badRequest(req, res, new Date().getMilliseconds() - start)
    }
}
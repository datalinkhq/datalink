// $$$$$$$\             $$\               $$\ $$\           $$\       
// $$  __$$\            $$ |              $$ |\__|          $$ |      
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\ 
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  / 
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<  
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\ 
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|     
                 
// Copyright (c) 2022 Datalink Contributors. All rights reserved.  

// This source code is licensed under the MIT license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root 
// directory of this source tree.

import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import { toNumber, toInteger } from 'lodash'
import prisma from '../../../lib/prisma'
import { Data } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import { validateEventTypes } from '../../../lib/validateTypeZ'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const body = req.body;
        const { id, token, DateISO, ServerID, PlaceID, Packet } = body
        const headers = req.headers
        const placeId = headers['Roblox-Id']
        if (id && token && DateISO && ServerID && Packet.EventID && Packet.EventName, Packet.PurchaseID && validateEventTypes("update", id, token, DateISO, ServerID, Packet, placeId)) {
            if (await validateToken(id as number, token as string) === true) {
                try {
                    await prisma.analytics.update({
                        where: {
                            EventID: Packet.EventID
                        },
                        data: {
                            ServerID: BigInt(ServerID),
                            PlaceID: BigInt(toInteger(placeId)),
                            EventName: Packet.EventName
                        }
                    })
                    res.status(200).json({ code: 200, status: `success` })
                    console.log(`Created event ${Packet.EventName} with ID: ${Packet.EventID}.`)

                } catch (e) {
                    console.log(e)
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(401).json({ code: 401, status: `Unauthorized` })
            }
        } else {
            res.status(400).json({ code: 400, status: 'Bad Request' })
        }
    } else {
        res.status(405).json({ code: 400, status:'Method Not Allowed' })
    }
}

export default withSentry(handler)

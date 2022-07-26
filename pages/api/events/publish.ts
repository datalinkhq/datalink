// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import { toNumber, toInteger } from 'lodash'
import prisma from '../../../lib/prisma'

type Data = {
    code: Number
    status: String
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const body = req.body;
        const { id, token, DateISO, ServerID, PlaceID, Packet, } = body
        const headers = req.headers
        const placeId = headers['Roblox-Id']
        if (id && token && DateISO && ServerID && PlaceID && Packet.EventID && Packet.EventName, Packet.PurchaseID) {
            if (await validateToken(toNumber(id), token.toString()) === true) {
                try {
                    await prisma.analytics.create({
                        data: {
                            PlaceID: BigInt(toInteger(placeId)),
                            PurchaseID:Packet.PurchaseID,
                            EventID: Packet.EventID,
                            ServerID: BigInt(ServerID),
                            EventName: Packet.EventName
                        }
                    })
                    res.status(200).json({ code: 200, status: `success` })
                    console.log(`Created event: ${Packet.EventName} with ID: ${Packet.EventID}.`)

                } catch (e) {
                    console.log(e)
                    res.status(500).json({ code: 500, status: `error` })
                }
            } else {
                res.status(401).json({ code: 401, status: `unauthorized` })
            }
        } else {
            res.status(400).json({ code: 400, status: 'Bad Request' })
        }
    }
}

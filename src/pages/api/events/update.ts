// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import { toNumber } from 'lodash'
import prisma from '../../../lib/prisma'
import { Data } from '../../../lib/types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const body = req.body;
        const headers = req.headers
        const UserAgent = headers['User-Agent']
        const { id, token, DateISO, ServerID, Packet, } = body
        // TODO: Check if user agent is from roblox httpservice
        if (id && token && DateISO && ServerID && Packet.EventID && Packet.EventName) {
            if (await validateToken(toNumber(id), token.toString()) === true) {
                try {
                    await prisma.analytics.update({
                        where: {
                            EventID: Packet.EventID
                        },
                        data: {
                            ServerID: BigInt(ServerID),
                            EventName: Packet.EventName
                        }
                    })
                    res.status(200).json({ code: 200, status: `Success` })
                    console.log(`Updated event: ${Packet.EventName} with ID: ${Packet.EventID}.`)

                } catch (e) {
                    console.log(e)
                    res.status(500).json({ code: 500, status: `Error` })
                }
            } else {
                res.status(401).json({ code: 401, status: `Uauthorized` })
            }
        } else {
            res.status(405).json({ code: 400, status: 'Method Not Allowed' })
        }
    }
}

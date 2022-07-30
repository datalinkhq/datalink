// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../../lib/fetchToken'
import validateToken from '../../../lib/validateSession'
import { toNumber, toInteger } from 'lodash'
import prisma from '../../../lib/prisma'
import { Data } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const body = req.body;
        const { id, token, DateISO, ServerID, Packet, } = body
        const headers = req.headers
        const placeId = headers['Roblox-Id']
        if (id && token && DateISO && ServerID && Packet.EventName) {
            if (await validateToken(toNumber(id), token.toString()) === true) {
                try {
                    await prisma.analytics.create({     
                        data: {
                            PlaceID: toInteger(placeId),
                            ServerID: BigInt(ServerID),
                            EventName: Packet.EventName.toString()
                        }
                    })
                    let data = await prisma.user.findUnique({
                        where: {
                            EventName: Packet.EventName.toString()
                        }
                    })
                    res.status(200).json({ code: 200, status: `success`, EventID: data?.EventID })
                    console.log(`Created event: ${Packet.EventName} with ID: ${data.EventID}.`)

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

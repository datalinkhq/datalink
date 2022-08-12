// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../lib/fetchToken'
import { v4 as uuidv4 } from 'uuid';
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { toNumber } from 'lodash'
import { Data } from '../../lib/types/types'
import { withSentry } from '@sentry/nextjs';
import jwt from 'jsonwebtoken'
import { env } from 'process'

const handler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body;
  const { id, token } = query;
  if (token && id) {
    if (await validateToken(toNumber(id), token.toString()) === true) {
      let session_key: any = jwt.sign({ data: token }, `${env.SECRET}`);
      try {
        await prisma.user.update({
          where: {
            id: toNumber(id),
          },
          data: {
            sessionKey: session_key.toString(),
            sessionTime: Math.floor((new Date()).getTime() / 1000).toString()
          }
        })

        session_key = await prisma.user.findUnique({
          where: {
            id: toNumber(id),
          }
        })

      } catch (e) {
        console.log(e)
      }
      res.status(200).json({ code: 200, status: `Success`, session_key: session_key.sessionKey })
    } else {
      res.status(401).json({ code: 401, status: `Unauthorized` })
    }
  } else {
    res.status(400).json({ code: 400, status: 'Bad Request' })
  }
}

export default withSentry(handler);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../lib/fetchToken'
import { v4 as uuidv4 } from 'uuid';
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { toNumber } from 'lodash'

type Data = {
  code: Number
  status: String
  session_key?: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body;
  const { id, token } = query;
  if (token && id) {
    if (await validateToken(toNumber(id), token.toString()) === true) {
      let session_key: any = uuidv4(); // generate session_key

      await prisma.user.update({
        where: {
          id: toNumber(id),
          token: token.toString()
        },
        data: {
          sessionKey: session_key.toString()
        }
      })

      session_key = await prisma.user.findUnique({
        where: {
          id: toNumber(id),
          token: token.toString()
        }
      })
      res.status(200).json({ code: 200, status: `success`, session_key: session_key.sessionKey })
    } else {
      res.status(401).json({ code: 401, status: `unauthorized` })
    }
  } else {
    res.status(400).json({ code: 400, status: 'Bad Request' })
  }
}

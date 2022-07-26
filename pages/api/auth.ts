// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchtoken from '../../lib/fetchToken'
import validateToken from '../../lib/validateToken'
import { toNumber } from 'lodash'

type Data = {
  code: Number
  status: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body;
  const { id, token } = query;
  if (token && id) {
    if (await validateToken(toNumber(id), token.toString()) === true) {
      res.status(200).json({ code: 200, status: `ok he pull up` })
    } else {
      res.status(401).json({ code: 401, status: `unauthorized` })
    }
  } else {
    res.status(400).json({ code: 400, status: 'Bad Request' })
  }
}

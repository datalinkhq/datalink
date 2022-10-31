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
import fetchtoken from '../../lib/fetchToken'
import { v4 as uuidv4 } from 'uuid';
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { Data } from '../../lib/types/types'
import { withSentry } from '@sentry/nextjs';
import jwt from 'jsonwebtoken'
import { env } from 'process'
import { validateAuthTypes } from '../../lib/validateTypeZ';

const handler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body;
  const { id, token } = query;
  if (token && id && validateAuthTypes(id, token)) {
    if (await validateToken(id as number, token as string) === true) {
      let session_key: any = jwt.sign({ data: token }, `${env.SECRET}`);
      try {
        await prisma.user.update({
          where: {
            id: id as number
          },
          data: {
            sessionKey: session_key as string,
            sessionTime: (Math.floor((new Date()).getTime() / 1000)).toString() 
          }
        })

        session_key = await prisma.user.findUnique({
          where: {
            id: id as number,
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
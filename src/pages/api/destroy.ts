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
import fetchtoken from '../../lib/fetchToken'
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { Data } from '../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import { validateAuthTypes } from '../../lib/validateTypeZ'

const handler = async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body;
  const { id, token, session_key } = query;
  if (token && id && session_key && validateAuthTypes(id, token)) {
    if (await validateToken(id as number, token as string) === true) {

      await prisma.user.update({
        where: {
          sessionKey: session_key as string
        },
        data: {
          sessionKey: null
        }
      })

      res.status(200).json({ code: 200, status: `Success` })
    } else {
      res.status(401).json({ code: 401, status: `Unauthorized` })
    }
  } else {
    res.status(400).json({ code: 400, status: 'Bad Request' })
  }
}

export default withSentry(handler)
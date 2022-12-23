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
import setToken from '../../lib/setToken'
import fetchToken from '../../lib/fetchToken'
import validateToken from '../../lib/validateToken'
import prisma from '../../lib/prisma'
import { Data } from '../../lib/types/types'
import { withSentry } from '@sentry/nextjs'
import { validateCreationTypes } from '../../lib/validateTypeZ'

const handler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = req.body;
    const { name, password } = body;

    if (name && password && validateCreationTypes(name, password) === true) {
        let data = await prisma.user.findUnique({
            where: {
                token: `${await setToken(name as string, password as string)}`
            }
        })
        try {
            res.status(200).json({ code: 200, status: `Success`, id: data?.id as number, token: `${data?.token}` })
        } catch (e) {
            res.status(500).json({ code: 500, status: `Error` })
        }

    } else {
        res.status(400).json({ code: 400, status: 'Bad Request' })
    }
}


export default withSentry(handler)
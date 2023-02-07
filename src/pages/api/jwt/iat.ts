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
import fetchtoken from '../../../lib/fetchToken'
import { v4 as uuidv4 } from 'uuid';
import validateToken from '../../../lib/validateToken'
import prisma from '../../../lib/prisma'
import { IssuedAtResponse } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs';
import jwt from 'jsonwebtoken'
import { env } from 'process'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IssuedAtResponse>
) {
    const start = new Date().getMilliseconds()
    const query = req.body;
    const { id } = query;
    if (id && typeof id === "number") {
        try {            
            const user = await prisma.user.findUnique({
                where: {
                    id: id as number
                }
            })

            res.status(200).json({ code: 200, status: `Success`, iat: user?.createdAt })
            return;
        } catch (e) {
            res.status(500).json({ code: 500, status: `Error`, iat: null })
            return;
        }
    } else {
        badRequest(req, res, new Date().getMilliseconds() - start)
    }
}
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
import { GHTokenResponse } from '../../../lib/types/types'
import { withSentry } from '@sentry/nextjs';
import jwt from 'jsonwebtoken'
import { env } from 'process'
import { generalBadRequest as badRequest } from '../../../lib/handlers/response';
import { validateGHTokenTypes } from '../../../lib/validateTypeZ';
import axios from 'axios';
import assert from 'assert';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GHTokenResponse>
) {
    const start = new Date().getMilliseconds()
    const query = req.body;
    const { clientId, code, redirectUri } = query;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET
    if (validateGHTokenTypes(clientId, clientSecret, code, redirectUri === true)) {
        const apiUri = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectUri}`
        try {
            const apiResponse = await axios.post(apiUri).catch((e) => { throw new Error(e) })
            assert(apiResponse.status === 200)

            res.status(200).json({ ...{ code: 200, status: `Success` }, ...apiResponse.data })
        } catch (e) {
            res.status(502).json({ code: 502, status: `Internal Error` })
        }
    } else {
        badRequest(req, res, new Date().getMilliseconds() - start)
    }
}
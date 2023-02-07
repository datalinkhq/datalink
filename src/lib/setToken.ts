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

import prisma from './prisma'
import { toNumber } from 'lodash'
import fetchtoken from './fetchToken'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { env } from 'process';
/**
 * Generate and sets a string for {@link prisma} model User.
 * @param {string} name - Username.
 * @param {string} data - Payload for token.
 */
async function give(name: string, data: string) {
    // let token: string = uuidv4(); // generate token
    try {
        let token: string = jwt.sign({ data: data }, `${env.SECRET}`);
        const decoded = jwt.verify(token, `${env.SECRET}`)

        if (typeof decoded === "object") {
            const issuedAt = decoded.iat

            await prisma.user.create({
                data: {
                    token: token,
                    name: name,
                    createdAt: issuedAt as number
                }
            })

            console.log(`Created user: ${name} with token: ${token}.`)
            return token
        }

    } catch (e) {
        console.log(e)
        return 'Error occurred while creating user.'
    }
}

export default give
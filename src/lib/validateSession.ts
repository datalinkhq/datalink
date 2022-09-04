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

import fetchtoken from './fetchSession';
import { toNumber } from 'lodash';
import prisma from './prisma';
import { env } from 'process';
import jwt from 'jsonwebtoken';

/**
 * Checks if a given sessionKey is valid using {@link prisma} model User.
 * @important - NOTE: A sessionKey expires after 30 minutes asynchronously. 
 * @param {Number} id - ID of the user.
 * @param {string} token - sessionKey of the user.
 * @returns {boolean} 
 */
export default async function validateToken(id: number, token: string): Promise<Boolean | undefined> {
    try {
        jwt.verify(token, `${env.SECRET}`);
        const exists = await fetchtoken(id, true)
        if (exists == null) {
            return false
        } else if (exists == token) {
            return true
        }
    } catch (e) {
        return false
    }
}

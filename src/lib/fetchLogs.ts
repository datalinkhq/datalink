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
import { toInteger, toNumber } from 'lodash'

/**
 * Fetches logs from the log {@link prisma} model.
 * @param {Number} uid - Id of the user.
 * @param {Number} id - Id of the flag.
 * @param {Boolean} debug - If true, returns null if no logs are found.
 * @returns {Array} 
 */
async function get(uid: Number, id?: Number, debug?: Boolean) {
    if (id) {
        let data = await prisma.log.findUnique({
            where: {
                id: toNumber(id)
            }
        })
        if (data) {
            return [data.type, data.trace, data.message]
        } else if (!data) {
            if (!debug) {
                return 'No logs found for this user!'
            } else if (debug === true) {
                return null
            }
        } else {
            return data
        }
    } else if (!id) {
        let data = await prisma.log.findMany({ where: { assocId: toInteger(uid) } })
        if (data) {
            return data
        } else if (!data) {
            if (!debug) {
                return 'No logs found for this user!'
            } else if (debug === true) {
                return null
            }
        } else {
            return data
        }
    }
}




async function test() {
    console.log(await get(1))

}


// test()

export default get
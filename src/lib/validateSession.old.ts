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

import { toNumber } from 'lodash';
import { validate as uuidValidate } from 'uuid';
import prisma from './prisma';
import fetchToken from "./fetchToken"

const now = Math.floor((new Date()).getTime() / 1000)
const checkTime = (time: number) => {
    const diff = toNumber(now) - time;
    if (time = 0) {
        return 'invalid time'
    }
    if (diff >= 1800) {
        return true;
    } else {
        return false;
    }
}

async function main(id: number, token: string) {
    let data = await prisma.user.findUnique({
        where: {
            id: toNumber(id)
        }
    })

    if (checkTime(toNumber(toNumber(data?.sessionTime))) === false) {
        if (uuidValidate(token) == true) { 
            const exists = await fetchToken(id, true)
            if (exists == null) {
                return false
            } else if (exists == token) {
                return true
            }
        }
    } else if (checkTime(toNumber(toNumber(data?.sessionTime))) === true) {
        return false
    }
}
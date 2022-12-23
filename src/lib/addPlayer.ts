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
import fetchtoken from './fetchToken'

/**
 * Creates a "Player" using {@link prisma}
 * @param {String} eventType - Type of event.
 * @param {Number} accountId - Id of the user.
 * @param {Number} accountAge - Age of the user account.
 * @param {String} sessionTime - Time of the session.
 * @param {Boolean} followedPlayer - If the user is following a player.
 * @param {Boolean} followedFriend - If the user is following a friend.
 * @param {Boolean} premium - If the user is premium.
 * @param {String} locale - Language of the user.
 * @param {String} region - Region of the user.
 * @returns {String}
 */
async function main(eventType: String, accountId: Number, accountAge?: Number, sessionTime?: String, followedPlayer?: Boolean, followedFriend?: Boolean, premium?: Boolean, locale?: String, region?: String) {
    if (eventType == 'playerJoined') {
        try {
            await prisma.player.create({
                data: {
                    accountId: toInteger(accountId),
                    accountAge: toInteger(accountAge),
                    followedPlayer: followedPlayer?.toString(),
                    followedFriend: followedFriend?.toString(),
                    premium: premium?.toString(),
                    locale: locale?.toString(),
                    region: region?.toString(),
                }
            })

            console.log(`Created Player: ${accountId} with age: ${accountAge}.`)

        } catch (e) {

            console.log(e)
            return 'Error occurred while creating Player.'
        }
    } else if (eventType == 'playerLeft') {
        try {
            await prisma.player.create({
                data: {
                    accountId: toInteger(accountId),
                    sessionTime: sessionTime?.toString()
                }
            })

            console.log(`Created Player: ${accountId} with sessionTime: ${sessionTime}.`)

        } catch (e) {

            console.log(e)
            return 'Error occurred while creating Player.'
        }
    }
}

export default main
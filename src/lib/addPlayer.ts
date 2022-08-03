import prisma from './prisma'
import { toInteger, toNumber } from 'lodash'
import fetchtoken from './fetchToken'

/**
 * Creates a "Player" using {@link prisma}
 * @param {String} eventType
 * @param {Number} accountId
 * @param {Number} accountAge
 * @param {String} sessionTime
 * @param {Boolean} followedPlayer
 * @param {Boolean} followedFriend
 * @param {Boolean} premium
 * @param {String} locale
 * @param {String} region
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
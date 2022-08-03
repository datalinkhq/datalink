import prisma from './prisma'
import { toNumber } from 'lodash'

/**
 * Fetches a sessionKey from {@link prisma} model User.
 * @param {Number} id
 * @param {Boolean} debug
 * @returns {String} 
 */
async function get(id: Number, debug?: Boolean) {
    let data = await prisma.user.findUnique({
        where: {
            id: toNumber(id)
        }
    })
    
    if (data) {
        return data.sessionKey
    } else if (!data) {
        if (!debug) {
        return 'No token found for this user!'
        } else if (debug === true) {
            return null
        }
    } else {
        return data
    }
}


async function test() {

    console.log(await prisma.user.findMany())
    console.log(await get(1))

}


// test()

export default get
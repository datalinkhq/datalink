import prisma from './prisma'
import { toInteger, toNumber } from 'lodash'

/**
 * Fetches logs from the log {@link prisma} model.
 * @param {Number} uid
 * @param {Number} id
 * @param {Boolean} debug
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
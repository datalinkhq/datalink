import prisma from './prisma'
import { toInteger, toNumber } from 'lodash'

/**
 * Fetches logs from the Flag {@link prisma} model.
 * @param {Number} uid - Id of the user.
 * @param {Number} id - Id of the flag.
 * @param {Boolean} debug - If true, returns null if no logs are found.
 * @returns {Array} 
 */
async function get(uid: Number, id?: Number, debug?: Boolean) {
    if (id) {
        let data = await prisma.flag.findUnique({
            where: {
                id: toNumber(id)
            }
        })
        if (data) {
            return [data.FeatureName, data.FeatureValue]
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
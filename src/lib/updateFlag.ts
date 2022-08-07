import prisma from './prisma'
import { toNumber } from 'lodash'
import fetchtoken from './fetchToken'
import { v4 as uuidv4 } from 'uuid';
/**
 * Updates the flagValue of a {@link prisma} model Flag.
 * @param {String} name - The name of the flag.
 * @param {Number} value - Float between 0 and 1.
 * @param {Number} id - The id of the flag to be updated.
 */
async function set(name: String, value: Number, id: Number) {
    try {

        await prisma.flag.update({
            where: {
                id: toNumber(id)
            },
            data: {
                FeatureName: name.toString(),
                FeatureValue: toNumber(value)
            }
        })

        console.log(`Updated flag: ${name} with value: ${value}.`)
        return "success"
    } catch (e) {
        console.log(e)
        return 'Error occurred while updating flag.'
    }
}

export default set
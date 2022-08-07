import prisma from './prisma'
import { toNumber } from 'lodash'
import fetchtoken from './fetchToken'
import { v4 as uuidv4 } from 'uuid';
/**
 * Sets the flagValue of a {@link prisma} model Flag.
 * @param {String} name - The name of the flag.
 * @param {Number} value - Float between 0 and 1.
 * @param {Number} assocId - The id of the associated entity.
 */
async function set(name: String, value: Number, assocId: Number) {
    try {

        await prisma.flag.create({
            data: {
                assocId: toNumber(assocId),
                FeatureName: name.toString(),
                FeatureValue: toNumber(value)
            }
        })

        console.log(`Created flag: ${name} with value: ${value}.`)
        let data = await prisma.flag.findFirst({
            where: {
                assocId: toNumber(assocId),
                FeatureName: name.toString(),
                FeatureValue: toNumber(value)
            }
        })
        return data?.id
    } catch (e) {
        console.log(e)
        return 'Error occurred while creating flag.'
    }
}

export default set
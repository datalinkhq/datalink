import prisma from './prisma'
import { toInteger } from 'lodash'

/**
 * Logs an event to {@link prisma} model Log.
 * @param {Number} id
 * @param {string} type
 * @param {string} trace
 * @param {string} error_message
 * @returns {String} 
 */
async function main(id: Number, type: string, trace: string, error_message: string) {
    await prisma.log.create({
        data: {
            assocId: toInteger(id),
            trace: trace,
            type: type,
            message: error_message
        }
    })
}

export default main
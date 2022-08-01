import prisma from './prisma'
import { toInteger } from 'lodash'

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
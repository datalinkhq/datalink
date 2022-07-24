import prisma from './prisma'
import { toNumber } from 'lodash'
import fetchtoken from './fetchToken'
// import EventEmitter from 'events'

// const eventEmitter = new EventEmitter();

async function give(id: number, name: string, token: string) {
    try {
        const exists = await fetchtoken(id, true)

        if (exists === null) {
            await prisma.user.create({
                data: {
                    token: token,
                    id: id,
                    name: name
                }
            })

            console.log(`Created user: ${name} with token: ${token}.`)
            return `Created user: ${name} with token: ${token}.`
        } else {
            await prisma.user.update({
                where: {
                    id: toNumber(name)
                },
                data: {
                    id: toNumber(name),
                    token: token
                }
            })

            console.log(`Set user: ${name} with token: ${token}.`)
            return `Set user: ${name} with token: ${token}.`
        }

    } catch (e) {

        console.log(e)
        return 'Error occurred while creating user.'
    }
}

export default give
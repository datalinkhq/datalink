import prisma from './prisma'
import { toNumber } from 'lodash'
import fetchtoken from './fetchToken'
import { v4 as uuidv4 } from 'uuid';
/**
 * Generate and sets a string for {@link prisma} model User.
 * @param {string} name
 */
async function give(name: string) {
    let token: string = uuidv4(); // generate token
    try {

        await prisma.user.create({
            data: {
                token: token,
                name: name,
            }
        })

        console.log(`Created user: ${name} with token: ${token}.`)
        return token

    } catch (e) {

        console.log(e)
        return 'Error occurred while creating user.'
    }
}

export default give
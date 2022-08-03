import { validate as uuidValidate } from 'uuid';
import fetchtoken from './fetchSession';
import { toNumber } from 'lodash';
import prisma from './prisma';

const now = Math.floor((new Date()).getTime() / 1000)

const checkTime = (time: number) => {
    const diff = toNumber(now) - time;
    if (time = 0) {
        return 'invalid time'
    }
    if (diff >= 1800) {
        return true;
    } else {
        return false;
    }
}
/**
 * Checks if a given sessionKey is valid using {@link prisma} model User.
 * NOTE: A sessionKey expires after 30 minutes asynchronously. 
 * @param {Number} id
 * @param {string} token
 * @returns {boolean} 
 */
export default async function validateToken(id: number, token: string): Promise<boolean|undefined> {
    let data = await prisma.user.findUnique({
        where: {
            id: toNumber(id)
        }
    })
    if (checkTime(toNumber(toNumber(data?.sessionTime))) === false) {
        if (uuidValidate(token) == true) { 
            const exists = await fetchtoken(id, true)
            if (exists == null) {
                return false
            } else if (exists == token) {
                return true
            }
        }
    } else if (checkTime(toNumber(toNumber(data?.sessionTime))) === true) {
        return false
    }
}

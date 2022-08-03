import { validate as uuidValidate } from 'uuid';
import fetchtoken from './fetchToken'

/**
 * Checks if a given token is valid using {@link prisma} model User.
 * @param {Number} id
 * @param {string} token
 * @returns {boolean} 
 */
export default async function validateToken(id: number, token: string): Promise<Boolean|undefined> {
    if (uuidValidate(token) == true) {
        const exists = await fetchtoken(id, true)
        if (exists == null) {
            return false
        } else if (exists == token) {
            return true
        }
    }
}

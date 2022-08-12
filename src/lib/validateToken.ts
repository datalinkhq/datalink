// TODO: Use JWT instead of UUID

import { validate as uuidValidate } from 'uuid';
import fetchtoken from './fetchToken'
import jwt from 'jsonwebtoken'
import { env } from 'process'


/**
 * Checks if a given token is valid using {@link prisma} model User.
 * @param {Number} id
 * @param {string} token
 * @returns {boolean} 
 */
export default async function validateToken(id: number, token: string): Promise<Boolean | undefined> {
    try {
        jwt.verify(token, `${env.SECRET}`);
        const exists = await fetchtoken(id, true)
        if (exists == null) {
            return false
        } else if (exists == token) {
            return true
        }
    } catch (e) {
        return false
    }
}

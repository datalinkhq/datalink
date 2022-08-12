// TODO: Use JWT instead of UUID

import fetchtoken from './fetchSession';
import { toNumber } from 'lodash';
import prisma from './prisma';
import { env } from 'process';
import jwt from 'jsonwebtoken';

/**
 * Checks if a given sessionKey is valid using {@link prisma} model User.
 * NOTE: A sessionKey expires after 30 minutes asynchronously. 
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

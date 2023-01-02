// $$$$$$$\             $$\               $$\ $$\           $$\       
// $$  __$$\            $$ |              $$ |\__|          $$ |      
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\ 
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  / 
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<  
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\ 
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|     

// Copyright (c) 2022 Datalink Contributors. All rights reserved.  

// This source code is licensed under the AGPL license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root 
// directory of this source tree.


import { z } from 'zod';

/**
 * Validates authentication API request bodies.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @returns {boolean} 
 */
function validateAuthTypes(id: any, token: any): boolean {
    try {
        const validator = z.object({
            id: z.number(),
            token: z.string()
        })

        validator.parse({ id, token })
        return true

    } catch (e) {
        return false
    }

}

/**
 * Validates account creation API request bodies.
 * @param {any} name - Username provided in the body.
 * @param {any} password - Authentication callback token provided in the body.
 * @returns {boolean} 
 */
function validateCreationTypes(name: any, password: any) {
    try {
        const validator = z.object({
            name: z.string(),
            password: z.string()
        })

        validator.parse({ name, password })
        return true
    } catch (e) {
        return false
    }
}

/**
 * Validates log API request bodies.
 * @param {"publish"  | "fetch"} endpoint - Type of API endpoint.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @param {any} trace - Log trace provided in the body.
 * @param {any} type - Log type provided in the body. This is first handled by validateLogType. (Optional)
 * @param {any} message - Log message provided in the body. (Optional)
 * @param {any} logid - LogID provided in the body. (Optional)
 * @returns {boolean}
 */
function validateInputLogTypes(endpoint: "publish" | "fetch", id: any, token: any, trace?: any, type?: any, message?: any, logid?: any): boolean | undefined {
    try {
        if (endpoint == 'publish') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                trace: z.string(),
                type: z.string(),
                message: z.string()
            })

            validator.parse({ id, token, trace, type, message })
            return true
        }

        if (endpoint == 'fetch') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                logid: z.number().nullish()
            })

            validator.parse({ id, token, logid })
            return true
        }

        if (!endpoint) {
            throw new Error('Invalid endpoint type')
        }
    } catch (e) {
        return false
    }
}

/**
 * Validates player API request bodies.
 * @param {"playerJoined"  | "playerLeft"} endpoint - Type of API endpoint.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @param {any} accountId - Pseudo accountID provided in the body.
 * @param {any} accountAge - Account age provided in the body. (Optional)
 * @param {any} followedPlayer - Boolean on whether the player joined another player; provided in the body. (Optional)
 * @param {any} followedFriend - Boolean on whether the player joined a friend; provided in the body. (Optional)
 * @param {any} followedPlayer - Boolean on whether the player's account is a premium account; provided in the body. (Optional)
 * @param {any} locale - Locale of the player provided in the body. (Optional)
 * @param {any} region - Region of the player provided in the body. (Optional)
 * @param {any} sessionTime - Time of the play session provided in the body. (Optional)
 * @returns {boolean}
 */
function validatePlayerTypes(endpoint: "playerJoined" | "playerLeft", id: any, token: any, accountId: any, accountAge?: any, followedPlayer?: any, followedFriend?: any, premium?: any, locale?: any, region?: any, sessionTime?: any): boolean | undefined {
    try {
        if (endpoint == 'playerJoined') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                accountId: z.number(),
                accountAge: z.number(),
                followedPlayer: z.boolean(),
                followedFriend: z.boolean(),
                premium: z.boolean(),
                locale: z.string().nullable(),
                region: z.string().nullable()
            })


            validator.parse({ id, token, accountId, accountAge, followedPlayer, followedFriend, premium, locale, region })
            return true
        }

        if (endpoint == 'playerLeft') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                accountId: z.number(),
                sessionTime: z.string()
            })

            validator.parse({ id, token, accountId, sessionTime })
            return true
        }


        if (!endpoint) {
            throw new Error('Invalid endpoint type')
        }
    } catch (e) {
        return false
    }
}

/**
 * Validates fast flag API request bodies.
 * @param {"fetch"  | "set" | "update"} endpoint - Type of API endpoint.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @param {any} flagid - FlagID provided in the body. (Optional)
 * @param {any} name - Name of the flag provided in the body. (Optional)
 * @param {any} value - Value of the flag provided in the body. (Optional)
 * @returns {boolean}
 */
function validateFastFlagTypes(endpoint: "fetch" | "set" | "update", id: any, token: any, flagid?: any, name?: any, value?: any): boolean | undefined {
    try {
        if (endpoint == 'fetch') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                flagid: z.number().nullable(),
                name: z.string()
            })

            validator.parse({ id, token, flagid, name })
            return true
        }

        if (endpoint == 'set') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                flagid: z.number().nullable(),
                name: z.string(),
                value: z.number()
            })

            validator.parse({ id, token, flagid, name, value })
            return true
        }

        if (endpoint == 'update') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                name: z.string(),
                value: z.number()
            })

            validator.parse({ id, token, name, value })
            return true
        }

        if (!endpoint) {
            throw new Error('Invalid endpoint type')
        }

    } catch (e) {
        return false
    }
}

/**
 * Validates event API request bodies.
 * @param {"publish"  | "update"} endpoint - Type of API endpoint.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @param {any} DateISO - DateISO provided in the body. 
 * @param {any} ServerID - ID of the server provided in the body. 
 * @param {any} Packet - Payload packet provided in the body. 
 * @param {any} Packet - PlaceID provided in the body. 
 * @returns {boolean}
 */
function validateEventTypes(endpoint: 'publish' | 'update', id: any, token: any, DateISO: any, ServerID: any, Packet: any, PlaceID: any): boolean | undefined {
    try {

        if (endpoint == 'update' || endpoint == 'publish') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                DateISO: z.string(),
                ServerID: z.bigint(),
                PlaceID: z.bigint(),
                Packet: z.object({
                    EventID: z.string(),
                    EventName: z.string(),
                    PurchaseID: z.bigint().nullable()
                })
            })

            validator.parse({ id, token, DateISO, ServerID, PlaceID, Packet })
            return true
        }

        if (!endpoint) {
            throw new Error('Invalid endpoint type')
        }

    } catch (e) {
        return false
    }
}

/**
 * Validates event API request bodies.
 * @param {"create"  | "exists" | "retrieve"} endpoint - Type of API endpoint.
 * @param {any} id - ID provided in the body.
 * @param {any} token - Token provided in the body.
 * @param {any} branchName - Name of the branch provided in the body. 
 * @returns {boolean}
 */
function validateBranchTypes(endpoint: 'create' | 'exists' | 'retrieve', id: any, token: any, branchName: any) {
    try {
        if (endpoint == 'create') {
            const validator = z.object({
                id: z.number(),
                token: z.string(),
                branchName: z.string()
            })

            validator.parse({ id: id, token: token, branchName: branchName })
            return true
        }
    } catch(e) {
        return false
    }
}

export {
    validateAuthTypes,
    validateCreationTypes,
    validateInputLogTypes,
    validatePlayerTypes,
    validateFastFlagTypes,
    validateEventTypes,
    validateBranchTypes
}
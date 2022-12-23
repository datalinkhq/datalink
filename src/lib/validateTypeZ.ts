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

function validateFastFlagTypes(endpoint: "fetch" | "set" | "update", id?: any, token?: any, flagid?: any, name?: any, value?: any): boolean | undefined {
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

function validateEventTypes(endpoint: 'publish' | 'update', id: any, token: any, DateISO: any, ServerID: any, Packet: {}, PlaceID: any): boolean | undefined {
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
                    PurchaseID: z.bigint()
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

export {
    validateAuthTypes,
    validateCreationTypes,
    validateInputLogTypes,
    validatePlayerTypes,
    validateFastFlagTypes,
    validateEventTypes
}
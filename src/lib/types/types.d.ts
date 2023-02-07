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

export type Res = {
    code: Number
    status: String
}

export type Data = Res & {
    id?: Number
    token?: String
    session_key?: String
    EventID?: String
}

export type Log = {
    [
    id: Number,
    code: Number,
    status: String,
    type?: String,
    trace?: String,
    message?: String
    ]: Array
}

export type Player = Res & {
    playerId?: Number
}

export type Flag = {
    [
    code: Number,
    status: String,
    flagId?: Promise<number | String | undefined>,
    FeatureName?: String,
    FeatureValue?: String
    ]: Array
}

export type Heartbeat = Res & {
    expiringSoon: Boolean
}

export type Branch = Res & {
    BranchID?: number
}

export type IdResponse = Res & {
    id?: number | null
}

export type ExistsReponse = Res & {
    exists?: boolean | null
}

export type SignResponse = Res & {
    signedToken?: string | null
}

export type IssuedAtResponse = Res & {
    iat?: number | null
}
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
export type Data = {
    code: Number
    status: String
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

export type Player = {
    code: Number
    status: String
    playerId?: Number
}

export type Flag = {
    [
    code: Number,
    status: String,
    flagId?: Promise<number | "Error occurred while creating flag." | undefined>,
    FeatureName?: String,
    FeatureValue?: String
    ]: Array
}
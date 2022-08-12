import { toNumber } from 'lodash';
import { validate as uuidValidate } from 'uuid';
import prisma from './prisma';
import fetchToken from "./fetchToken"

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

async function main(id: number, token: string) {
    let data = await prisma.user.findUnique({
        where: {
            id: toNumber(id)
        }
    })

    if (checkTime(toNumber(toNumber(data?.sessionTime))) === false) {
        if (uuidValidate(token) == true) { 
            const exists = await fetchToken(id, true)
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
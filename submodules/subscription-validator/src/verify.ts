import prisma from '../lib/prisma';
import axios from 'axios';

async function main(roid: bigint): Promise<Boolean|String|undefined> {
    const data = await prisma.user.findFirst({
        where: {
            roid: roid
        }
    });
    if (data) {
        return data.isPremium;
    } else if (!data) {
        return "User does not exist."
    }
}

export default main

// main(BigInt(213671823)).then(console.log)
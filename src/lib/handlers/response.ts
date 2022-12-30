import { NextApiRequest, NextApiResponse } from "next"
import { Data } from "../types/types"
import * as logger from "../middleware/logger"
import { toNumber } from "lodash"
import c from "ansi-colors"
import { randomUUID } from "crypto"
import { userAgent } from "next/server"
import bodyRegistry from "./bodyRegistry"

function generalBadRequest(req: NextApiRequest, res: NextApiResponse<Data>, dur: number) {
    const metricsId = `request_${randomUUID()}`
    if (!req.url) return;

    const endpointBodyExpected: string[] = bodyRegistry[req.url]

    let matches: string[] = []

    endpointBodyExpected.forEach((v) => {
        for (let k in req.body) {
            if (k == v) {
                matches[matches.length + 1] = k
            }
        }
    })

    const notProvided = endpointBodyExpected.filter(i => !matches.includes(i)).toString().replaceAll(',', ', ')

    res.status(400).json({ code: 400, status: 'Bad Request' })
    try {
        const clientDetails = req.headers["user-agent"]
        var browser = clientDetails?.split(" ")[8].split('/')[0] || "unknown"
        var engine = clientDetails?.split(" ")[7].split('/')[0] || "unknown"
    } catch (e) { }

    logger.error(req.url || "unknown", req.method as "GET" | "POST" | "PUT", `${c.magenta(c.bold("requestID"))}: ${metricsId}, ${c.cyan(c.bold("client"))}: ${engine + browser} -> ${dur}ms `)
    logger.hint(req.url || "unknown", `${c.magenta(c.bold("requestID"))}: ${metricsId}, body did not provide ${notProvided}`)
}

export { generalBadRequest }
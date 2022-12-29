import { NextApiRequest, NextApiResponse } from "next"
import { Data } from "../types/types"
import * as logger from "../middleware/logger"
import { toNumber } from "lodash"
import c from "ansi-colors"
import { randomUUID } from "crypto"
import { userAgent } from "next/server"

function generalBadRequest(req: NextApiRequest, res: NextApiResponse<Data>, dur: number) {
    const metricsId = `request_${randomUUID()}`
    res.status(400).json({ code: 400, status: 'Bad Request' })

    const clientDetails = req.headers["user-agent"]
    const browser = clientDetails?.split(" ")[8].split('/')[0] || "unknown"
    const engine = clientDetails?.split(" ")[7].split('/')[0] || "unknown" 

    logger.error(req.url || "idk", req.method as "GET" | "POST" | "PUT", `${c.magenta(c.bold("requestID"))}: ${metricsId}, ${c.cyan(c.bold("client"))}: ${engine + browser} -> ${dur}ms `)
}

export { generalBadRequest }
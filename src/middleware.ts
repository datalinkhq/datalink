import { INTERNALS } from 'next/dist/server/web/spec-extension/request';
import { NextRequest, NextResponse, userAgent } from 'next/server'
import * as logger from "./lib/middleware/logger"
import c from 'ansi-colors'
import d from 'next/dist/server/lib/utils'

export function middleware(request: NextRequest) {
  let metricsId = `request_${crypto.randomUUID()}`
  let start = new Date().getMilliseconds()
  console.time(metricsId)

  // Only log on non internal next.js endpoints
  if (!request.url.includes("_next")) {
    let url = request.url.split("/").filter((v, k) => { 
      if (!process.env.BASE_URL) return; 
      if (!v.includes(process.env.BASE_URL || ":")) {
        return k > 2
      }
    })
    
    let parsedUrl: string = ""
    for (let k in url) {
      let v = url[k]
      parsedUrl += "/" + v
    }
    const clientDetails = userAgent({ headers: request.headers} )
    const browser = clientDetails.browser.name ? `${clientDetails.browser.name}` : "unknown"
    const engine = clientDetails.engine.name ? `${clientDetails.engine.name}` : "unknown"

    let end = new Date().getMilliseconds()

    logger.info(parsedUrl, request.method as "GET" | "POST" | "PUT", `${c.magenta(c.bold("requestID"))}: ${metricsId}, ${c.cyan(c.bold("client"))}: ${engine + browser} -> ${end - start}ms `)
    

  }

  return NextResponse.next()
}
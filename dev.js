const { createServer } = require('http')
const { parse } = require('url')
const nextApp = require('next')({ dev: true, hostname: "0.0.0.0", port: 3000 })
const intercept = require('intercept-stdout')
const c = require('ansi-colors')
const handleOther = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            const rawUrl = parse(req.url, true)
            const { pathname, query } = rawUrl
            if (pathname) {
                if (!pathname.includes('api')) {
                    await nextApp.render(req, res, pathname, query)
                } else {
                    await handleOther(req, res, rawUrl)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }).listen(3000, (e) => {
        if (!e) {
            console.clear()
            console.log(`${c.bgGreen(c.bold("  READY "))}  Client compiled and listening to port ${c.yellow(c.bold("3000"))}.`)
            intercept((text) => {
                if (text.includes("wait") || text.includes("info") || text.includes("event")) {
                    return ""
                }
            })
        } else {
            throw new Error(e)
        }
    })
})


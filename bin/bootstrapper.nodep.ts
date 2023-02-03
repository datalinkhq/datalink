import next from 'next'
import c from "ansi-colors"
import intercept from "intercept-stdout"
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { get } from 'https'
import { parse } from 'url'
import { createWriteStream, mkdirSync, PathLike, readFileSync, statSync, unlinkSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
// import extract from 'extract-zip'
import StreamZip from 'node-stream-zip'
import { createHash } from 'crypto'

function invalidOptionError(opt: string): never {
    console.log(`${c.bgRed(c.bold("  ERROR "))}  Failed to initialize client: invalid option provided for ${c.yellow(c.bold(opt))}.`)
    process.exit(1)
}

function internalError(err: string): never {
    console.log(`${c.bgRed(c.bold("  ERROR "))}  ${err}`)
    try { unlinkSync("/etc/datalink") } catch (e) {
        console.log(`${c.bgRed(c.bold("  ERROR "))}  Cannot remove failed install. Please remove /etc/datalink manually.`)
    }
    process.exit(1)
}

function info(str: string) {
    console.log(`${c.bgGreen(c.bold("  INFO  "))}  ${str}`)
}

let port: string | undefined = process.env.DATALINK_PORT
let hostname = process.env.DATALINK_SERVER_DOMAIN

function setup() {
    info("Initializing setup for node18-linux-x64...")
    if (!port) invalidOptionError("PORT")
    if (!hostname) invalidOptionError("HOSTNAME")

    // Check if the source already exists
    try {
        statSync("/etc/datalink")

        // Exists, just run already!
        try {
            const data = readFileSync(path.join(process.cwd(), "installation.json"))
            const configs: { location: string } = JSON.parse(data.toString())
            run(configs.location)
        } catch (e) {
            internalError("Cannot read installation details. Reinstalling may fix this.")
        }
    } catch (e) {
        // No existing installation
        const dest = path.join(tmpdir(), "datalink")
        const archive = path.join(dest, "datalink-server-linux-x86_64.zip")

        try {
            mkdirSync(dest)
        } catch (e) {
            internalError("Failed to create temporary directory for installation.");
        }

        let stream = createWriteStream(archive)
        try {
            info("Downloading latest server source...")
            get("https://github.com/datalinkhq/datalink/archive/refs/heads/main.zip", (res) => {
                res.pipe(stream)
                stream.on('finish', () => {
                    stream.close((e) => {
                        if (e) {
                            internalError("Failed to close installation stream. Please try again.")
                        }
                    })
                })
            })
        } catch (e) {
            internalError("Failed to pull datalink source. Please try again.")
        }

        const archiveInstance = readFileSync(archive)
        const archiveHash = createHash('sha256').update(archiveInstance).digest('hex')
        const installDir = `/etc/datalink/${archiveHash}`
        try { mkdirSync(installDir) } catch (e) {
            internalError("Failed to create server installation directory. Aborting.")
        }

        // await extract(archive, { dir: installDir })

        const archiveStream = new StreamZip({ file: archive })

        archiveStream.on('error', (e) => e ? internalError("Failed to unarchive server contents.") : info("Unarchiving server source..."))

        archiveStream.on('ready', () => {
            archiveStream.extract(null, installDir, (e, count) => {
                if (e) {
                    internalError("Failed to unarchive server contents.")
                } else {
                    info(`Unarchived server contents (${count} files).`)
                }

                archiveStream.close()
            })
        })
        try {
            writeFileSync(path.join(process.cwd(), "installation.json"), `{ \"location\": \"${installDir}\" }`)
        } catch (e) {
            internalError("Failed to write installation details. Aborting.")
        }

        run(installDir)
    }
}

function run(dir: PathLike) {
    process.chdir(dir.toString())
    const nextApp = next({ dev: false, hostname, port: Number(port) || 80 })
    const handleOther = nextApp.getRequestHandler()

    nextApp.prepare().then(() => {
        createServer(async (req: IncomingMessage, res: ServerResponse) => {
            try {
                const reqUrl = req.url || "unknown"
                const rawUrl = parse(reqUrl, true)
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
        }).listen(3000, () => {
            console.clear()
            console.log(`${c.bgGreen(c.bold("  READY "))}  Client instantiated and listening on port ${c.yellow(c.bold("3000"))}.`)
            intercept((text: string | string[]) => {
                if (text.includes("wait") || text.includes("info") || text.includes("event")) {
                    return ""
                }
            })
        })
    })
}

setup()
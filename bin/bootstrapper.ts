import next from 'next'
import c from "ansi-colors"
import intercept from "intercept-stdout"
import { createServer, IncomingMessage, ServerResponse, get } from 'http'
import { parse } from 'url'
import { createWriteStream, mkdir, PathLike, readFile, readFileSync, stat, unlink, writeFile } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import extract from 'extract-zip'
import { createHash } from 'crypto'


function invalidOptionError(opt: string): never {
    console.log(`${c.bgGreen(c.bold("  ERROR "))}  Failed to initialize client: invalid option provided for ${c.yellow(c.bold(opt))}.`)
    process.exit(1)
}

function internalError(err: string): never {
    console.log(`${c.bgGreen(c.bold("  ERROR "))}  ${err}.`)
    unlink("/etc/datalink", (e) => {
        if (e) {
            console.log(`${c.bgGreen(c.bold("  ERROR "))}  Cannot remove failed install. Please remove /etc/datalink manually.`)
        }
    })
    process.exit(1)
}

let port: string | undefined = process.env.DATALINK_PORT
let hostname = process.env.DATALINK_SERVER_DOMAIN

function setup() {
    if (!port) invalidOptionError("PORT")
    if (!hostname) invalidOptionError("HOSTNAME")

    // Check if the source already exists
    stat("/etc/datalink", async (e, contents) => {
        if (e) {
            // No exisitng installation
            const dest = path.join(tmpdir(), "datalink")
            

            mkdir(dest, undefined, (e) => {
                if (e) return;
            })

            let stream = createWriteStream(dest)
            try {
                get("https://github.com/datalinkhq/datalink/archive/refs/heads/main.zip", (res) => {
                    res.pipe(stream)

                    stream.on('finish', () => {
                        stream.close()
                    })
                })
            } catch (e) {
                internalError("Failed to pull datalink source. Please try again.")
            }
            const archive = path.join(dest, "main.zip")
            const archiveInstance = readFileSync(archive)
            const archiveHash = createHash('sha256').update(archiveInstance).digest('hex')
            const installDir = `/etc/datalink/${archiveHash}`

            mkdir(installDir, undefined, (e) => {
                if (e) {
                    internalError("Failed to create server installation directory. Aborting.")
                }
            })

            await extract(archive, { dir: installDir })

            writeFile(path.join(__dirname, "installation.json"), `{ \"location\": \"${installDir}\" }`, (e) => {
                if (e) {
                    internalError("Failed to write installation details. Aborting.")
                }
            })

            run(installDir)
        } else {
            // Exists, just run already!
            const installDir = readFile(path.join(__dirname, "installation.json"), (e, data) => {
                if (e) {
                    internalError("Cannot read installation details. Reinstalling may fix this.")
                } else {
                    const configs: { location: string } = JSON.parse(data.toString())
                    run(configs.location)
                }
            })
            
        }
    })
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


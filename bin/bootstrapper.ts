import next from 'next'
import c from "ansi-colors"
import intercept from "intercept-stdout"
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { get } from 'https'
import { parse } from 'url'
import { createWriteStream, mkdir, mkdirSync, PathLike, readFileSync, statSync, unlinkSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import download from 'download'
import { createHash } from 'crypto'
import { exec, spawn, spawnSync } from 'child_process'

// FOR INSTALLATION SCRIPT:
// First we need to import the required GPG keys from https://id.devcomp.xyz,
// Then we need to make git trust the temporary directory: git config --global 
// --add safe.directory $DEST.
// Finally, we can download and run the bootstrapper code


function invalidOptionError(opt: string): never {
    console.log(`${c.bgRed(c.bold("  ERROR "))}  Failed to initialize client: invalid option provided for ${c.yellow(c.bold(opt))}.`)
    process.exit(1)
}

function internalError(err: string): never {
    console.log(`${c.bgRed(c.bold("  ERROR "))}  ${err}`)
    try {
        unlinkSync("/etc/datalink");
        unlinkSync("/tmp/datalink")
    } catch (e) {
        console.log(`${c.bgRed(c.bold("  ERROR "))}  Cannot remove failed install. Please remove /etc/datalink and /tmp/datalink manually.`)
    }
    process.exit(1)
}

function info(str: string) {
    console.log(`${c.bgGreen(c.bold("  INFO  "))}  ${str}`)
}

let port: string | undefined = process.env.DATALINK_PORT
let hostname = process.env.DATALINK_SERVER_DOMAIN

async function setup() {
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
        // if something breaks: blame this
        const dest = path.join(tmpdir(), "datalink-server-linux-x86_64")

        try {
            mkdirSync(dest)
        } catch (e) {
            internalError("Failed to create temporary directory for installation.");
        }


        try {
            const req: { sha: string, commit: { verification: { signature: string } } } = await fetch("https://api.github.com/repos/datalinkhq/datalink/commits/main").then((r) => r.json())

            const commitHash = req.sha
            var archiveHash = createHash('sha256').update(commitHash).digest('hex')
            var installDir = `/etc/datalink/${archiveHash}`
            info("Downloading latest server source...")

            mkdirSync("/etc/datalink")
            mkdirSync(installDir)

            exec(`git clone https://github.com/datalinkhq/datalink.git ${dest}`).on('error', (_) => internalError("Failed to clone datalink source. Please try again."))
            process.chdir(dest)
            const gpgVerification = spawn(`git verify-commit -v --raw HEAD`)// .on('error', (e: any) => console.log(e) + internalError("GPG verification failed. Source may have been tampered with. Aborting."))

            gpgVerification.stdout.on('data', (out: string) => {
                info(`${c.bold(c.blue("[GPG]"))} ${out.trim().split("[GNUPG:]")[0]}`)
            })

            gpgVerification.stderr.on('data', (err: string) => {
                console.log(err)
            })



            writeFileSync(path.join(installDir, "signature.gpg"), req.commit.verification.signature)
        } catch (e) {
            console.log(e)
            internalError("Failed to pull datalink source. Please try again.")
        }


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
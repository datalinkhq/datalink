import c from 'ansi-colors'

const infoStyle = c.bgGreen
const errorStyle = c.bgRed
const routeStyle = c.blue


function info(route: string, method: "GET"|"POST"|"PUT", message: any) {
    console.log(`${infoStyle( c.bold("  " + method + "  "))} ${c.underline(routeStyle(route))} ${message}`)
}

function error(route: string, method: "GET"|"POST"|"PUT", message: any) {
    console.log(`${errorStyle(c.bold("  " + method + "  "))} ${c.underline(routeStyle(route))} ${message}`)
}

export { info, error }
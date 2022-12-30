import c from 'ansi-colors'

const infoStyle = c.bgGreen
const errorStyle = c.bgRed
const routeStyle = c.blue
const hintStyle = c.bgYellow


function info(route: string, method: "GET"|"POST"|"PUT", message: any) {
    console.log(`${infoStyle( c.bold("  " + method + "   "))}  ${c.underline(routeStyle(route))} ${message}`)
}

function error(route: string, method: "GET"|"POST"|"PUT", message: any) {
    console.log(`${errorStyle(c.bold("  " + method + "   "))}  ${c.underline(routeStyle(route))} ${message}`)
}

function hint(route: string, message: any) {
    console.log(`${hintStyle(c.bold("  HINT  "))}  ${c.underline(routeStyle(route))} ${message}`)
}

export { info, error, hint }
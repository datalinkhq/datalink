const registry: { [endpoint: string]: string[] } = {
    "/api/heartbeat": [ "id", "token" ],
    "/api/auth": [ "id", "token" ]
}

export default registry
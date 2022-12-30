const registry: { [endpoint: string]: string[] } = {
    "/api/heartbeat": [ "id", "token" ],
    "/api/auth": [ "id", "token" ],
    "/api/create": [ "name", "password" ],
    "/api/destroy": [ "id", "token", "session_key" ],
    "/api/events/publish": [ "id", "token", "DateISO", "ServerID", "Packet" ],
    "/api/logs/publish": [ "id", "token", "trace", "type" ],
    "/api/logs/fetch": [ "id", "token" ] || [ "id", "token", "logid" ],
    "/api/internal/playerJoined": [ 
        "id", "token", "accountId", "accountAge", "followedPlayer", "followedFriend", "premium", "locale", "region"
    ], 
    "/api/internal/playerLeft": [ "id", "token", "accountId", "sessionTime" ],
    "/api/ff/set": [ "id", "token", "name", "value" ],
    "/api/ff/fetch": [ "id", "token" ] || [ "id", "token", "flagid" ] || [ "id", "token", "name" ],
    "/api/ff/update": [ "id", "token", "flagid", "name", "value" ]
}

export default registry
import service from "./config.services";

const playersListService = () => {
    return service.get("/players/list")
}

const playerDetailsService = (playerId) => {
    return service.get(`/players/${playerId}/details`)
}

const playersLikesService = (playerId) => {
    return service.post(`/players/${playerId}/like`)
}

const playersDislikesService = (playerId) => {
    return service.post(`/players/${playerId}/unlike`)
}

const createPlayerService = (createData) => {
    return service.post("/players/new-player", createData)
}

export {
    playersListService,
    playerDetailsService,
    playersLikesService,
    createPlayerService,
    playersDislikesService
} 
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

const createPlayerService = () => {
    return service.get("/players/new-player")
}

export {
    playersListService,
    playerDetailsService,
    playersLikesService,
    createPlayerService
} 
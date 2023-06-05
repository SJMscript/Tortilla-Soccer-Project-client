import service from "./config.services";

const playersListService = () => {
    return service.get("/players/list")
}

const playerDetailsService = (playerId) => {
    return service.get(`/players/${playerId}/details`)
}

const playersLikesService = (playerliked) => {
    return service.post(`/players/${playerliked}/like`)
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
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

<<<<<<< HEAD
const addCommentService = (playerId, comment) => {
    return service.post(`/players/${playerId}/details`, comment)
=======
const deletePlayerService = (playerId) => {
    return service.delete(`/players/${playerId}/unlike`)
>>>>>>> 8ddf6fe9b90a2eb55bf8feaaad7c91231d976b5f
}

export {
    playersListService,
    playerDetailsService,
    playersLikesService,
    createPlayerService,
    playersDislikesService,
<<<<<<< HEAD
    addCommentService
=======
    deletePlayerService
>>>>>>> 8ddf6fe9b90a2eb55bf8feaaad7c91231d976b5f
} 
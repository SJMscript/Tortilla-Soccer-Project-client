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

const addCommentService = (playerId, comment) => {
    return service.post(`/players/${playerId}/details`, comment)
}
    
const deletePlayerService = (playerId) => {
    return service.delete(`/players/${playerId}/delete`)
}

const updatePlayerService = (playerId, uploadData) => {
    return service.put(`/players/${playerId}/edit-player`, uploadData)
}

const getPlayerCommentsService = (playerId) => {
    return service.get(`/players/${playerId}/comments`);
}

export {
    playersListService,
    playerDetailsService,
    playersLikesService,
    createPlayerService,
    playersDislikesService,
    addCommentService,
    deletePlayerService,
    getPlayerCommentsService,
    updatePlayerService
} 

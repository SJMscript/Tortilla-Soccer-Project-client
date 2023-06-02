import service from "./config.services";

const playersListService = () => {
    return service.get("/players/list")
}

export {
    playersListService,
} 
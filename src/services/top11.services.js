import service from "./config.services";

const top11ListService = () => {
    return service.get("/top11/createTop11")
}



export {
    top11ListService
}
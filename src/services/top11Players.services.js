import service from "./config.services";


const createTop11Service = () => {
    return service.post(`/createTop11`)
}

export {
    createTop11Service,
}


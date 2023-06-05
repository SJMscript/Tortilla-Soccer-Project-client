import service from "./config.services";


const createTop11Service = () => {
    return service.post(`/top11/createTop11`)
}

export {
    createTop11Service,
}


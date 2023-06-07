import service from "./config.services";


const createTop11Service = (top11Data) => {
    return service.post(`/top11/createTop11`, top11Data)
}

export {
    createTop11Service,
}


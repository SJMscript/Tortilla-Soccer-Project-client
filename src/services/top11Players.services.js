import service from "./config.services";

const getTop11Service = () => {
    return service.get(`/top11/createTop11`)
}


const createTop11Service = (top11Data) => {
    return service.post(`/top11/createTop11`, top11Data)
}

export {
    getTop11Service,
    createTop11Service,
}


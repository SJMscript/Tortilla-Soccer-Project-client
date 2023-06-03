import service from "./config.services";


const profileService = () => {
    return service.get("/user/profile")
}


export {
    profileService,
}
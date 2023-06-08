import service from "./config.services";


const profileService = () => {
    return service.get("/user/profile")
}

const editProfileService = (userData) => {
    return service.put("/user/profile/edit", userData)
}

const getUserRoleService = () => {
    return service.get("/user/role");
  };
  

export {
    profileService,
    editProfileService,
    getUserRoleService
}
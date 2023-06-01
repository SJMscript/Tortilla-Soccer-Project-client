import service from "./config.services";

const signupService = (user) => {
    // User => username, email, password
    return service.post("/auth/signup", user)
}

const loginService = (credentials) => {
    // Credentials => email, password
    return service.post("/auth/login", credentials)
}

const verifyService = () => {
    // Token
    return service.get("/auth/verify")
}

export {
    signupService,
    loginService,
    verifyService
}
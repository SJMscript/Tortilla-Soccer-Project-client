import { createContext, useEffect, useState } from "react"
import { verifyService } from "../services/auth.services"

const AuthContext = createContext()

function AuthWrapper(props) {

    // 1. Estados o Funciones a exportar
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ activeUser, setActiveUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true) // la App empieza con el token validado
    
    useEffect(() => {

        authenticateUser()

    },[])

    // Funcion de verify
    const authenticateUser = async () => {
        try {
            
            const response = await verifyService()
            console.log("Token Validado")
            console.log(response)
            setIsLoggedIn(true)
            setActiveUser(response.data.payload)
            setIsLoading(false)

        } catch (error) {
            console.log("Token no validado")
            console.log(error)
            setIsLoggedIn(false)
            setActiveUser(null)
            setIsLoading(false)
        }
    }

    // 2. El objeto de contexto a pasar
    const passedContext = {
        isLoggedIn,
        activeUser,
        authenticateUser
    }

    if (isLoading) {
        return (
                //! Poner un spinner
            <div className="App">
                <h3>Validando Credenciales...</h3>
            </div>
        )
    }


    // 3. La renderizacion de la app con el contexto
    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )

}

export {
    AuthContext,
    AuthWrapper
}
// Esto es un envoltorio a otros componentes para renderizarlos unicamente si el usuario esta activo

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"


function IsPrivate(props) {
    
    const { isLoggedIn } = useContext(AuthContext);
    
    
    if (isLoggedIn) {
        // Si el usuario esta logeado, renderizar children
        return props.children
    } else {
        // Si no esta logeado redirecciona a otro lugar (Home)
        return <Navigate to="/" />
    }


  
}

export default IsPrivate
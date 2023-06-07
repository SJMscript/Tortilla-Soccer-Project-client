import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {

  const navigate = useNavigate()


  const { isLoggedIn, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    // 1. Borrar el token
    localStorage.removeItem('authToken')

    //2. Validad en el BackEnd que el token fue eliminado
    authenticateUser()

    // 3. Redireccionamos a Home
    navigate("/")
  }


  return (
 <nav className="navbar-div">

    <Link to="/">Home</Link>

    {isLoggedIn && <Link to="/user/profile">Profile</Link>}
    {isLoggedIn && <Link to="/players/list">Players List</Link>}
    {isLoggedIn && <Link to="/top11/createTop11">Top 11</Link>}
    {isLoggedIn && <Link to="/players/new-player">Create Player</Link>}
    {isLoggedIn && <Link to="/stadiums">Stadiums</Link>}
    {isLoggedIn && <Link to="/createTop11">Hall of Fame</Link>}
    {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}


    {!isLoggedIn && <Link to="/auth/signup">Sign Up</Link>}
    {!isLoggedIn && <Link to="/auth/login">Log In</Link>}

 </nav>
  )
}

export default Navbar
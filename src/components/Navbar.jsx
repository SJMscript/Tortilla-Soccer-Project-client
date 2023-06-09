import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getUserRoleService } from "../services/profile.services";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    getUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  const getUserRole = async () => {
    try {
      const response = await getUserRoleService();
      setIsModerator(response.data.role === "moderator");
    } catch (error) {
      setIsModerator(false);
    }
  };

  return (
    <nav className="navbar-div">
      <Link className="link-navbar" to="/">
        Home
      </Link>

      {isLoggedIn && (
        <>
          <Link className="link-navbar" to="/user/profile">
            Profile
          </Link>
          <Link className="link-navbar" to="/players/list">
            Players List
          </Link>
          <Link className="link-navbar" to="/top11/createTop11">
            Top 11
          </Link>
          {isModerator && (
            <Link className="link-navbar" to="/players/new-player">
              Create Player
            </Link>
          )}
          <Link className="link-navbar" to="/stadiums">
            Stadiums
          </Link>
          <Link className="link-navbar" to="/hallOfFame">
            Hall of Fame
          </Link>
          <button className="button-logout" onClick={handleLogout}>
            Log Out
          </button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link className="link-navbar" to="/auth/signup">
            Sign Up
          </Link>
          <Link className="link-navbar" to="/auth/login">
            Log In
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
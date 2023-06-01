import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMesage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    try {
      
      const response = await loginService({
        email,
        password
      })

      console.log("response", response);

      // 1.  Guardamos el Token en (localStorage)
      localStorage.setItem("authToken", response.data.authToken)

      // 2. Validar token y saber quien es el usuario y si esta activo
      await authenticateUser()

      navigate("/user/profile")
      

    } catch (error) {
       console.log("error", error);

       if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMesage)
      } else {
        // Tipo 500
        navigate("/error")
      }
  
    }

  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        {errorMesage && <p style={{color: "red"}}> {errorMesage} </p>}

        <button type="submit">Login</button>
      </form>
      
    </div>
  );
}

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import styles from "../../css/signup.module.css"

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMesage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    // ... signup logic here

    try {
      
      const user = {
        username,
        email,
        password
      }

      await signupService(user)
      navigate("/auth/login")

    } catch (error) {
      console.log(error)
       console.log(error.response.status);
       console.log(error.response.data.errorMesage
        );
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMesage)
      } else {
        // Tipo 500
        navigate("/error")
      }
    }

  };

  return (
    <div className={styles.signDivMain}>
    <div className={styles.signDiv}>
      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

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

        <button className={styles.signBtn} type="submit">Signup</button>
      </form>
      
    </div>
    </div>
  );
}

export default Signup;
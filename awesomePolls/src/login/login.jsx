import useUserContext from "../pollProvider"
import light from "./login.module.css"
import dark from "./logindark.module.css"
import axios from "axios"

const Login = () => {

  const { theme, setUser } = useUserContext()

  const styles = theme ? light : dark

  async function handleLogin(){

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if(username === "" || password === ""){
      console.log("Blank Details won't create an account You Stupid Baby")
      return
    }

    const req = {
      username: username,
      password: password
    }

    const res = await axios.post(`http://localhost:8080/user`, req)

    if(res.data){
      setUser(username)
      console.log(`Logged in as ${username}`)
    }
    else{
      console.log("Cannot Login!")
    }

    closeWindow()

  }

  function closeWindow(){

    const overlay = document.getElementById("loginOverlay")
    overlay.style.display = "none"

  }

  return(

    <div id="loginOverlay" className={styles.loginOverlay}>

      <div className={styles.login}>

        <button id={styles.closeButton} onClick={closeWindow}>Close</button>
        <input id="username" type="text" placeholder="username" />
        <input id="password" type="text" placeholder="password" />
        <button id={styles.submitButton} onClick={handleLogin}>Get Started</button>

      </div>

    </div>

  )

}

export default Login

import { useEffect, useRef, useState } from "react"
import useUserContext from "../pollProvider"
import light from "./login.module.css"
import dark from "./logindark.module.css"
import axios from "axios"
import BouncingDots from "../spinner/bouncingdots"

const Login = () => {

  const { theme, setUser } = useUserContext()

  const styles = theme ? light : dark

  const overlayRef = useRef(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const overlay = document.querySelector("dialog")
    overlay.addEventListener("click", handleClickOutsideOverlay)

    function handleClickOutsideOverlay(event){
      if(overlayRef.current && 
        event.target.contains(overlayRef.current)){
        closeWindow()
      }
    }

    return () => overlay.removeEventListener("click", handleClickOutsideOverlay)

  }, [])

  async function handleLogin(){

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if(username === "" || password === ""){
      console.log("Blank Details won't create an account You Stupid Baby")
      return
    }

    setLoading(true)

    const req = {
      username: username,
      password: password
    }

    const start = Date.now()

    const res = await axios.post(`http://localhost:8080/user`, req)

    const elapsed = Date.now() - start
    const minWaitTime = 1000

    if(res.data){
      setUser(username)
      console.log(`Logged in as ${username}`)
    }
    else{
      console.log("Cannot Login!")
    }

    setTimeout(() => {
      closeWindow()
    }, Math.max(0, minWaitTime - elapsed))

    setTimeout(() => {
      setLoading(false)
    }, 3000)

  }

  function closeWindow(){

    const dialog = document.querySelector("dialog")
    dialog.close()

  }

  return(

    <dialog>

      <div className={styles.login} ref={overlayRef}>

        <button id={styles.closeButton} onClick={closeWindow}>Close</button>
        <h2>AwesomePolls</h2>

        {loading 
          ? <BouncingDots /> 
          : <div className={styles.inputFields}>
          <h3>Enter Your Username and Password to Get Started</h3>
          <input id="username" type="text" className={styles.userInputs} placeholder="Username" />
          <input id="password" type="text" className={styles.userInputs} placeholder="Password" />
          <button id={styles.submitButton} onClick={handleLogin}>Get Started</button>
        </div>}

      </div>

    </dialog>

  )

}

export default Login

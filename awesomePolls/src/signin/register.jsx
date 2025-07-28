import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import useUserContext from "../pollProvider"
import light from "./signin.module.css"
import dark from "./signindark.module.css"

import axiosClient from "../axiosClient"

const Register = () => {

  const navigate = useNavigate()

  const { theme, setUser } = useUserContext()
  const styles = theme ? light : dark

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }
  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  async function handleRegister(){
    const user = {
      username: username,
      password: password
    }

    const res = await axiosClient.post(`register`, user)

    sessionStorage.clear()
    sessionStorage.setItem("token", `${res.data}`)

    setUser(username)
    navigate("/")
  }

  return(

    <motion.div 
        initial={{opacity: 0, x: -20}} 
        animate={{opacity: 1, x: 0}} 
        transition={{duration: 0.3}} 
        exit={{opacity: 0, x: 20}}>

      <div className={styles.signinContainer}>
        <div className={styles.signin}>

          <img src="https://placehold.co/200" alt="awesomePolls logo" />
          <h2>Create Account</h2>
          <input type="text" onChange={handleUsernameChange} placeholder="username"/>
          <input type="password" onChange={handlePasswordChange} placeholder="password" />
          <button onClick={handleRegister}>Sign Up</button>
          <h3>Already Have an Account? <span style={{
            color: theme ? `hsl(200, 70%, 50%)` : `hsl(200, 70%, 80%)`, 
            cursor: `pointer`
          }} onClick={() => navigate("/signin")}>...Sign In</span></h3>

        </div>
      </div>

    </motion.div>

  )

}

export default Register

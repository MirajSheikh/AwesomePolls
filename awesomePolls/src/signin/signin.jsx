import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import useUserContext from "../pollProvider"
import light from "./signin.module.css"
import dark from "./signindark.module.css"

import axiosClient from "../axiosClient"
import BouncingDots from "../spinner/bouncingdots"

const Signin = () => {

  const navigate = useNavigate()

  const { user, theme, setUser, addToast } = useUserContext()
  const styles = theme ? light : dark

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useSearchParams()
  const status = params.get("status")

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }
  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  async function handleSignin(){

    setLoading(true)

    const user = {
      username: username,
      password: password
    }

    const res = await axiosClient.post(`signin`, user)
      .catch(() => {
        addToast("Unable to Login! Check your Username and Password and Try Again", "error")
        navigate(`/signin?status=incorrect_credentials`)
        setLoading(false)
        return
      })

    sessionStorage.clear()

    sessionStorage.setItem("token", `${res.data}`)

    setTimeout(() => {
      navigate("/")
      setUser(username)
      setLoading(false)
      addToast(`Hello ${username}`, "success")
    }, 1000)
  }

  return(

    <motion.div 
        initial={{opacity: 0, x: -20}} 
        animate={{opacity: 1, x: 0}} 
        transition={{duration: 0.3}} 
        exit={{opacity: 0, x: 20}}>

      {loading 
      ? <div className={styles.loading}>
          <BouncingDots size="1" />
        </div>
      : !user && <div className={styles.signinContainer}>
        <div className={styles.signin}>

          <img src="https://placehold.co/200" alt="awesomePolls logo" />
          <h2>Login to your Account</h2>
            {status && <h3 style={{color: `hsl(0, 50%, 70%)`}}>{status}</h3>}
          <input type="text" id="username" onChange={handleUsernameChange} placeholder="username"/>
          <input type="password" id="password" onChange={handlePasswordChange} placeholder="password" />
          <button onClick={handleSignin}>Sign In</button>
          <h3>Don't Have an Account? <span style={{
            color: theme ? `hsl(200, 70%, 50%)` : `hsl(200, 70%, 80%)`, 
            cursor: `pointer`
          }} onClick={() => navigate("/register")}>...Sign Up</span></h3>

        </div>
      </div>}

    </motion.div>

  )

}

export default Signin

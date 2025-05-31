import { useNavigate } from "react-router-dom";
import styles from "./home.module.css"
import useUserContext from "../pollProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import BouncingDots from "../spinner/bouncingdots";

const Home = () => {

  const {user, setUser} = useUserContext()

  const [loadingUser, setLoadingUser] = useState(false)

  const navigate = useNavigate();

  async function handleCreateUser(){
    const user = document.getElementById("username").value
    const pass = document.getElementById("password").value

    if(user === "" || pass === ""){ 
      console.log("Cannot Create User") 
      return
    }

    const userData = {
      username: user,
      password: pass
    }

    setLoadingUser(true)

    const res = await axios.post(`http://localhost:8080/user`, userData)

    setTimeout(() => {
      setLoadingUser(false)
      res ? setUser(user) : console.log("Cannot Login")
    }, 1000)

  }

  return(

    <motion.div
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      transition={{duration: 0.3}}>

    <div className={styles.home}>

      <h1 id={styles.homeTitle}>Awesome Polls</h1>
      <h2 id={styles.homeSubTitle}>Create, Vote and Participate in Polls from all over the World</h2>


      {!loadingUser 

      ? !user 
        ? <div className={styles.usernameBlock}>
          <input type="text" id="username" placeholder="Your Username" />
          <input type="text" id="password" placeholder="Enter Password" />
          <button onClick={handleCreateUser}>Get Started</button>
        </div>
        : <div className={styles.buttonsBlock}>
          <h2>Hello {`${user}`}</h2>
          <button onClick={() => navigate("/new")}>New Poll</button>
          <button onClick={() => navigate("/polls")}>Explore</button>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>

      : <BouncingDots />
      }

    </div>
    </motion.div>

  );

}

export default Home

import { useNavigate } from "react-router-dom";
import styles from "./home.module.css"
import useUserContext from "../pollProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import BouncingDots from "../spinner/bouncingdots";
import Navbar from "../navbar/navbar";
import SamplePoll from "../samplepoll/samplepoll";

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
    <>
      <Navbar />

      <motion.div
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        exit={{opacity: 0}} 
        transition={{duration: 0.3}}>

        <div className={styles.home}>

          <div className={styles.homeContent}>

            <h1 id={styles.homeTitle}>AwesomePolls</h1>
            <h2 id={styles.homeSubTitle}>You want Polls? We Got'em!! </h2>

            <div className={styles.homeButtons}>
              <button onClick={() => navigate("/new")}>Make a Poll</button>
              <button onClick={() => navigate("/polls")}>Explore</button>
            </div>

          </div>

          <div className={styles.homeImage}>
            <SamplePoll />
          </div>

        </div>

        <hr style={{margin: "0.5rem 3rem", border: "1px solid hsl(200, 70%, 40%)"}}/>

        <div className={styles.home}>
          <div className={styles.statsLeft}>
            <h2>1M+</h2>
            <h3>Total Voters</h3>
          </div>

          <div className={styles.statsRight}>
            <h2>10,000+</h2>
            <h3>Active Polls</h3>
            
          </div>
        </div>

    </motion.div>

    </>

  );

}

export default Home

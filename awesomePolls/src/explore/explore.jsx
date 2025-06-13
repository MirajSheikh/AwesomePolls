import { useEffect, useState } from "react";
import light from "./explore.module.css"
import dark from "./exploredark.module.css"
import axios from "axios";
import LeftSideBar from "../leftsidebar/leftsidebar";
import Explorepolls from "./explorepolls";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../spinner/spinner";
import useUserContext from "../pollProvider";

const Explore = () => {

  const navigate = useNavigate()

  const { theme } = useUserContext()

  const styles = theme ? light : dark

  const [loading, setLoading] = useState(true)
  const [polls, setPolls] = useState([])
  const [searchPolls, setSearchPolls] = useState([])
  const [input, setInput] = useState("")
  const [searched, setSearched] = useState(false)

  useEffect(() => {

    async function fetchPolls(){

      const start = Date.now()

      const res = await axios.get(`http://localhost:8080/poll`)

      const elapsed = Date.now() - start
      const minWait = 500

      setTimeout(() => {
        setLoading(false)
        setPolls(res.data)
      }, Math.max(0, minWait - elapsed))

    }

    fetchPolls()

  }, [])

  useEffect(() => {

    if(polls.length > 0 && input !== ""){
      const sp = polls.filter((poll) => poll.title.toLowerCase().includes(input.toLowerCase()))
      setSearchPolls(sp)
    }

  }, [input])


  return(

    <>
    <LeftSideBar />

    <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      transition={{duration: 0.3}} >

    <div className={styles.exploreContainer}>

      <h1>Explore Polls</h1>

      {searched && 
            <div className={styles.searchInfo}>
              <h4>Search Results for - '<span style={{fontStyle: "italic", fontWeight: "700"}}>{input}</span>'</h4>
              <button onClick={() => setSearched(false)}>Clear Search</button>
            </div> 
      }

      {loading && <Spinner />}

      {searched 

            ? searchPolls.length > 0 && 

              searchPolls.map(spoll => 
                <Explorepolls key={spoll.id} poll={spoll} />
              )

            : polls.length > 0 

              ? polls.map(poll => 
                <Explorepolls key={poll.id} poll={poll} />
              )

              : !loading && <div className={styles.noPolls}>
                <h2>The Website is Still New 😅</h2>
                <h3>Create a New Poll to Start Filling it up</h3>
                <button onClick={() => navigate("/new")}>New Poll</button>
              </div>

      }

    </div>
    </motion.div>

    </>

  );

}

export default Explore

import { useEffect, useState } from "react";
import light from "./explore.module.css"
import dark from "./exploredark.module.css"
import LeftSideBar from "../leftsidebar/leftsidebar";
import Explorepolls from "./explorepolls";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "../spinner/spinner";
import useUserContext from "../pollProvider";

import axiosClient from "../axiosClient";

const Explore = () => {

  const navigate = useNavigate()

  const { theme } = useUserContext()
  const styles = theme ? light : dark

  const [params, setParams] = useSearchParams()
  const searchInput = params.get("search")

  const [loading, setLoading] = useState(false)
  const [polls, setPolls] = useState([])

  async function fetchPolls(){

    document.getElementById("searchBar").value = ""
    setLoading(true)

    const start = Date.now()

    const res = await axiosClient.get(`poll/all`)

    const elapsed = Date.now() - start
    const minWait = 500

    setTimeout(() => {
      setLoading(false)
      setPolls(res.data)
    }, Math.max(0, minWait - elapsed))

  }

  useEffect(() => {

    fetchPolls()

  }, [])

  useEffect(() => {

    setLoading(true)
    setPolls([])

    if(polls.length > 0 && searchInput){
      setTimeout(() => {
        const sp = polls.filter((poll) => poll.title.toLowerCase().includes(searchInput.toLowerCase()))
        setLoading(false)
        setPolls(sp)
      }, 500)
    }

  }, [searchInput])


  return(

    <>
    <LeftSideBar />

    <motion.div 
        initial={{opacity: 0, x: -20}} 
        animate={{opacity: 1, x: 0}} 
        transition={{duration: 0.3}} 
        exit={{opacity: 0, x: 20}}>

    <div className={styles.exploreContainer}>

      <h1>Explore Polls</h1>

          <AnimatePresence>
          {searchInput && 
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3}}>
              <div className={styles.searchInfo}>
                <h3>Showing Search Results for {
                  <span style={{
                    fontStyle: "italic", 
                    color: `${theme ? "hsl(200, 50%, 50%)" : "hsl(200, 50%, 70%)"}`
                  }}>{searchInput}</span>}
                </h3>
                <button onClick={() => {
                    navigate("/polls")
                    fetchPolls()
                  }}>Clear Search</button>
              </div>
            </motion.div>}
          </AnimatePresence>

      {loading && <div style={{margin: `auto`}}>
          <Spinner size="big" />
        </div>}

      {polls.length > 0 

        ? polls.map(poll => 
          <Explorepolls key={poll.id} poll={poll} />)

        : !loading && <div className={styles.noPolls}>
          <h2>No Polls Found</h2>
          <h3>Be the First one to Create this Poll</h3>
          <button onClick={() => navigate("/new")}>New Poll</button>
        </div>

      }

    </div>
    </motion.div>

    </>

  );

}

export default Explore

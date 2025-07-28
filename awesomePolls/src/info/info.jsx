import light from "./info.module.css"
import dark from "./infodark.module.css"
import useUserContext from "../pollProvider"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Info = ({ poll, setShowInfo }) => {

  const { theme } = useUserContext()

  const navigate = useNavigate()

  const infoRef = useRef(null)

  const styles = theme ? light : dark

  const styleHR = theme ? {
    borderColor: `white`,
    borderWidth: `1px`,
    borderStyle: `solid`
  }
  : {
      borderColor: `hsl(200, 70%, 90%)`,
      borderWidth: `1px`,
      borderStyle: `solid`
    }

  useEffect(() => {

    function closeInfoOverlay(event){

      if(infoRef.current && event.target.contains(infoRef.current)){
        const infoOverlay = infoRef.current
        infoOverlay.style.transform = `scale(0.1)`
        infoOverlay.style.opacity = `0`
        setTimeout(() => {
          setShowInfo(false)
        }, 200)
      }

    }

    document.addEventListener("click", closeInfoOverlay)

    return () => document.removeEventListener("click", closeInfoOverlay)

  }, [])

  function timeLeft(){
    return `A String Containing how much time is left for the poll to expire down to seconds`
  }

  return(

    <div id="infoOverlay" className={styles.infoOverlay} ref={infoRef}>
      <motion.div 
        style={{width: `100%`}} 
        initial={{opacity: 0}} transition={{duration: 0.3}} animate={{opacity: 1}} >

        <h1>{poll.title}</h1>

        <div className={styles.winner}>
          <h2>{poll.options[poll.winner]}</h2>
          <h2>{poll.voteCounts[poll.winner]} Votes</h2>
        </div>

        <div className={styles.infoInfo}>
          <h3>Total Votes: {poll.totalVotes}</h3><hr style={styleHR} />
          <h3>Likes: {poll.likes}</h3><hr style={styleHR} />
          <h3>Dislikes: {poll.dislikes}</h3><hr style={styleHR} />
          <h3>Author: {poll.user.username}</h3><hr style={styleHR} />
          <h3>Status: {poll.expired ? `Expired` : `Live`}</h3><hr style={styleHR} />
          {!poll.expired && <h3>{timeLeft()}</h3>}
        </div>

        <div className={styles.infoButtons}>
          <button onClick={() => navigate(`/polls/${poll.id}`)}>Open</button>
          <button>Delete</button>
        </div>

      </motion.div>
    </div>

  )

}

export default Info

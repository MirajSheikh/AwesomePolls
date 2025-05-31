import { useNavigate } from "react-router-dom"
import styles from "./explore.module.css"
import { useState } from "react"

const Explorepolls = ({ poll }) => {

  const navigate = useNavigate()

  const [expiry, setExpiry] = useState(`Calculating Time...`)
  const [expired, setExpired] = useState(false)

  function timeLeft(){

    const expiry = new Date(poll.expiry)
    const now = new Date()

    const hoursLeft = Math.floor(((expiry - now)/(1000*60*60))%24)
    const minsLeft = Math.floor(((expiry - now)/(1000*60))%60)

    let timeLeftString
    if(hoursLeft === 0){
      timeLeftString = `${minsLeft} Mins`
    }
    else{
      timeLeftString = `${hoursLeft} ${hoursLeft !== 1 ? `Hrs` : `Hr`} ${minsLeft} Mins`
    }
    setExpiry(expiry - now <= 0 ? `Expired` : timeLeftString)
    setExpired(expiry - now <= 0 ? true : false)

  }

  setInterval(timeLeft, 2000)


  return(

    <div className={styles.pollsList}>

        <div className={expired ? styles.pollExpired : styles.poll}>
          <h2>{poll.title}</h2>
          <p>Time Left : {expiry === `Expired` ? <span style={{color: "hsl(0, 50%, 50%)"}}>{expiry}</span> : expiry}</p>
          <p>{`Votes : ${poll.totalVotes}`}</p>
          <p>{`Created By : ${poll.user.username}`}</p>


          <div className={styles.pollButtons}>
            <button id={styles.voteButton} onClick={() => navigate(`/polls/${poll.id}`)}>
              {expired ? `View Results` : `Vote`}
            </button>

            <div className={styles.pollInfoButtons}>
              <button id={styles.likeButton}>{`👍🏻${poll.likes}`}</button>
              <button id={styles.dislikeButton}>{`👎🏻${poll.dislikes}`}</button>
              <button id={styles.favoriteButton}>
                {`${poll.favorite ? `💗` : `💔`}`}
              </button>
            </div>
          </div>


        </div>

    </div>

  )

}

export default Explorepolls

import { useNavigate } from "react-router-dom"
import light from "./explore.module.css"
import dark from "./exploredark.module.css"
import { useEffect, useState } from "react"
import useUserContext from "../pollProvider"
import axios from "axios"

const Explorepolls = ({ poll }) => {

  const navigate = useNavigate()

  const { theme, user } = useUserContext()

  const styles = theme ? light : dark

  const [expiry, setExpiry] = useState(`Calculating Time...`)
  const [expired, setExpired] = useState(false)

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [likeCount, setLikeCount] = useState(poll.likes)
  const [dislikeCount, setDislikeCount] = useState(poll.dislikes)

  useEffect(() => {

    async function getLikedAndDisliked(){
      if(!user){
        return
      }

      const likeresp = await axios.get(`http://localhost:8080/likeDislike/like?username=${user}&pollId=${poll.id}`)
      const dislikeresp = await axios.get(`http://localhost:8080/likeDislike/dislike?username=${user}&pollId=${poll.id}`)

      setLiked(likeresp.data)
      setDisliked(dislikeresp.data)
    }

    getLikedAndDisliked()

  }, [])

  async function handleLike(){
    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(poll.id)
    }
    const like = await axios.post(`http://localhost:8080/poll/like`, likeDislikeDTO)

    console.log(like.data)

    if(!liked){
      setLikeCount(likeCount+1)
      setLiked(true)
    }
    else{
      setLikeCount(likeCount-1)
      setLiked(false)
    }
    if(disliked){
      if(dislikeCount > 0){
        setDislikeCount(dislikeCount-1)
      }
    }

    setDisliked(false)
  }

  async function handleDislike(){
    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(poll.id)
    }

    const dislike = await axios.post(`http://localhost:8080/poll/dislike`, likeDislikeDTO)
    console.log(dislike.data)

    if(!disliked){
      setDislikeCount(dislikeCount+1)
      setDisliked(true)
    }
    else{
      setDislikeCount(dislikeCount-1)
      setDisliked(false)
    }
    if(liked){
      if(likeCount > 0){
        setLikeCount(likeCount-1)
      }
    }

    setLiked(false)
  }

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
          <p>Time Left : {expiry === `Expired` ? <span style={{color: "hsl(0, 50%, 70%)"}}>{expiry}</span> : expiry}</p>
          <p>{`Votes : ${poll.totalVotes}`}</p>
          <p>{`Created By : ${poll.user.username}`}</p>


          <div className={styles.pollButtons}>
            <button id={styles.voteButton} onClick={() => navigate(`/polls/${poll.id}`)}>
              {expired ? `View Results` : `Vote`}
            </button>

            <div className={styles.pollInfoButtons}>

              <button id={styles.likeButton} onClick={handleLike} 
                style={{
                color: `${liked ? "white" : "hsl(240, 50%, 50%)"}`, 
                  backgroundColor: `${liked ? "hsl(200, 70%, 50%)" : "hsl(200, 70%, 85%)"}`
              }}>{`👍🏻${likeCount}`}</button>

              <button id={styles.dislikeButton} onClick={handleDislike} style={{
              color: `${disliked ? "white" : "hsl(240, 50%, 50%)"}`, 
                backgroundColor: `${disliked ? "hsl(200, 70%, 50%)" : "hsl(200, 70%, 85%)"}`
            }}>{`👎🏻${dislikeCount}`}</button>

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

import { useNavigate } from "react-router-dom"
import light from "./explore.module.css"
import dark from "./exploredark.module.css"
import { useEffect, useState } from "react"
import useUserContext from "../pollProvider"

import axiosClient from "../axiosClient"
import { AnimatePresence } from "framer-motion"

const Explorepolls = ({ poll }) => {

  const token = sessionStorage.getItem("token")

  const navigate = useNavigate()

  const { theme, user, addToast } = useUserContext()

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

      const likeresp = await axiosClient.get(`likeDislike/like?username=${user}&pollId=${poll.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const dislikeresp = await axiosClient.get(`likeDislike/dislike?username=${user}&pollId=${poll.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      setLiked(likeresp.data)
      setDisliked(dislikeresp.data)
    }

    getLikedAndDisliked()

  }, [])

  async function handleLike(){

    if(expired){
      addToast("Cannot Like... The poll has Expired", "error")
      return
    }

    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(poll.id)
    }
    await axiosClient.post(`poll/like`, likeDislikeDTO, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

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

    if(expired){
      addToast("Cannot Dislike... The poll has Expired", "error")
      return
    }

    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(poll.id)
    }

    await axiosClient.post(`poll/dislike`, likeDislikeDTO, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

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

  function handleFavorite(){
    addToast("Feature Not Available Yet", "warn")
    return
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

    <AnimatePresence>
      <div className={styles.pollContainer}>

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
                backgroundColor: `${liked ? "hsl(200, 70%, 50%)" : expired ? "hsl(0, 0%, 80%)" : "hsl(200, 70%, 85%)"}`
              }}>{`👍🏻${likeCount}`}</button>

              <button id={styles.dislikeButton} onClick={handleDislike} style={{
                color: `${disliked ? "white" : "hsl(240, 50%, 50%)"}`, 
                backgroundColor: `${disliked ? "hsl(200, 70%, 50%)" : expired ? "hsl(0, 0%, 80%)" :  "hsl(200, 70%, 85%)"}`
            }}>{`👎🏻${dislikeCount}`}</button>

              <button id={styles.favoriteButton} onClick={handleFavorite}>
                {`${poll.favorite ? `💗` : `💔`}`}
              </button>
            </div>
          </div>


        </div>

      </div>
    </AnimatePresence>

  )

}

export default Explorepolls

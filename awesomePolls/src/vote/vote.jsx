import { useNavigate, useParams } from "react-router-dom";
import light from "./vote.module.css"
import dark from "./votedark.module.css"
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useUserContext from "../pollProvider";
import { motion } from "framer-motion";
import BouncingDots from "../spinner/bouncingdots";
import LeftSideBar from "../leftsidebar/leftsidebar";

import axiosClient from "../axiosClient";

const Vote = () => {

  const token = sessionStorage.getItem("token")

  const {user, theme, addToast} = useUserContext()

  const styles = theme ? light : dark

  const { pollId } = useParams()

  const [loadingPoll, setLoadingPoll] = useState(true)
  const [poll, setPoll] = useState(null)
  const [currentClient, setCurrentClient] = useState(null)
  const [votedOption, setVotedOption] = useState(null)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [expired, setExpired] = useState(true)

  const navigate = useNavigate();

  //fetch poll
  useEffect(() => {

    setLoadingPoll(true)

    async function fetchPoll(){

      const start = Date.now()

      const res = await axiosClient.get(`poll/${pollId}`)

      const elapsed = Date.now() - start
      const minWait = 500

      setTimeout(() => {
        setLoadingPoll(false)
        setPoll(res.data)
        setExpired(res.data.expired)
      }, Math.max(0, minWait - elapsed))

    }

    fetchPoll()

  }, [pollId])

  //establish websocket connection
  useEffect(() => {

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Vote!!", "error")
      return
    }
    
    const socket = new SockJS(`http://localhost:8080/ws?token=${token}`)
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {

        client.subscribe(`/topic/poll-updates`, (message) => {
          const updatedPoll = JSON.parse(message.body)
          setPoll(updatedPoll)
        })
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      reconnectDelay: 5000,
    })

    client.activate()

    setCurrentClient(client)

    return () => {
      client.deactivate()
    }

  }, [])

  //votedOption ko backend se fetch kro
  useEffect(() => {

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Vote!!", "error")
      return
    }

     axiosClient.get(`userVotes/vote?username=${user}&pollId=${pollId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    .then(response => {
      setVotedOption(response.data.voteOptionIndex)
      addToast("Joined Voting Channel", "success")
      })
    .catch(() => {
      addToast("Joined Voting Channel", "success")
      })
  }, [pollId])

  //get liked and disliked on poll change
  useEffect(() => {

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Vote!!", "error")
      return
    }

    axiosClient.get(`likeDislike/like?username=${user}&pollId=${pollId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    .then(response => {
      setLiked(response.data)
      })
    .catch(() => {
        addToast("Session Expired! Please Login Again", "error")
        sessionStorage.clear()
      })

    axiosClient.get(`likeDislike/dislike?username=${user}&pollId=${pollId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
    .then(response => {
      setDisliked(response.data)
      })
    .catch(() => {
        addToast("Session Expired! Please Login Again", "error")
        sessionStorage.clear()
      })

  }, [pollId, poll])

  async function handleVote(optionIndex){

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Vote!!", "error")
      return
    }

    if(expired){
      addToast("Poll Expired!!! Cannot Vote", "error")
      return
    }

    if(!currentClient || !currentClient.connected){ 
      addToast("client not connected", "error")
      return 
    }

    if(votedOption === optionIndex){
      return
    }

    setVotedOption(optionIndex)

    //create and send the voteMessage
    const voteMessage = {
      pollId: parseInt(pollId),
      optionIndex: optionIndex,
      voter: user
    }

    currentClient.publish({
      destination: `/app/vote`,
      body: JSON.stringify(voteMessage)
    })

    //update the data in userVotes table
    const userVotes = {
      username: user,
      pollId: parseInt(pollId),
      voteOptionIndex: optionIndex
    }

    //create or update vote
    await axiosClient.post(`userVotes`, userVotes, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

  }

  function handleLike(){

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Like!", "error")
      return
    }

    if(expired){
      addToast("Poll Expired!!! Cannot Like", "error")
      return
    }

    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(pollId)
    }

    currentClient.publish({
      destination: `/app/like`,
      body: JSON.stringify(likeDislikeDTO)
    })

  }

  function handleDislike(){

    if(!sessionStorage.getItem("token")){
      addToast("Please Log in to Dislike", "error")
      return
    }

    if(expired){
      addToast("Poll Expired!!! Cannot Dislike", "error")
      return
    }

    const likeDislikeDTO = {
      username: user,
      pollId: parseInt(pollId)
    }

    currentClient.publish({
      destination: `/app/dislike`,
      body: JSON.stringify(likeDislikeDTO)
    })

  }


  return(

    <>
      {!loadingPoll && <LeftSideBar />}
    <motion.div
    initial={{opacity: 0}} 
    animate={{opacity: 1}}
    transition={{duration: 0.3}} >

    {loadingPoll 

      ? <div className={styles.pollLoader}>
          <BouncingDots />
        </div> 

      : poll && <div className={styles.votePage}>

      <button id={styles.backToExplore} onClick={() => navigate("/polls")}>Back To Explore</button>

      <div className={styles.choices}>
        <h1>{poll && poll.title}</h1>
        {poll && 
          poll.options.map((opt, i) => 
            <div key={i} className={`${i === votedOption ? styles.selected : styles.choice}`}>
              <h2 onClick={() => handleVote(i)}>{opt}</h2>
              <h4>{`${poll.voteCounts[i]} votes`}</h4>
            </div>
            )}
      </div>

      <div className={styles.pollInfo}>
        <h2>{`${poll.totalVotes} votes`}</h2>
        <button className={`${liked ? styles.liked : styles.unliked}`} onClick={handleLike}>👍🏻 {poll && poll.likes}</button>
        <button className={`${disliked ? styles.liked : styles.unliked}`} onClick={handleDislike}>👎🏻 {poll && poll.dislikes}</button>
        <button className={styles.favorite}>{poll && poll.favorite ? `💗` : `💔`}</button>
      </div>

      <button className={styles.shareButton}>Share</button>

    </div>}

    </motion.div>
    </>

  );

}

export default Vote

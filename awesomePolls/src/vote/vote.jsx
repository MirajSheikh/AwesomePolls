import { useNavigate, useParams } from "react-router-dom";
import light from "./vote.module.css"
import dark from "./votedark.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import useUserContext from "../pollProvider";
import { motion } from "framer-motion";
import BouncingDots from "../spinner/bouncingdots";
import LeftSideBar from "../leftsidebar/leftsidebar";

const Vote = () => {

  const {user, theme} = useUserContext()

  const styles = theme ? light : dark

  const { pollId } = useParams()

  const [loadingPoll, setLoadingPoll] = useState(true)
  const [poll, setPoll] = useState(null)
  const [currentClient, setCurrentClient] = useState(null)
  const [votedOption, setVotedOption] = useState(null)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const [expired, setExpired] = useState(false)

  const navigate = useNavigate();

  //fetch poll
  useEffect(() => {

    setLoadingPoll(true)

    async function fetchPoll(){

      const start = Date.now()

      const res = await axios.get(`http://localhost:8080/poll/${pollId}`)

      const elapsed = Date.now() - start
      const minWait = 500

      setTimeout(() => {
        setLoadingPoll(false)
        setPoll(res.data)
        setExpired(res.data.isExpired())
      }, Math.max(0, minWait - elapsed))

    }

    fetchPoll()

  }, [pollId])

  //establish websocket connection
  useEffect(() => {
    
    const socket = new SockJS(`http://localhost:8080/ws`)
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Client Connected Successfully")

        client.subscribe(`/topic/poll-updates`, (message) => {
          console.log("yes subscribe ho rha hai")
          const updatedPoll = JSON.parse(message.body)
          setPoll(updatedPoll)
        })
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    })

    client.activate()

    setCurrentClient(client)

    return () => {
      client.deactivate()
    }

  }, [])

  //votedOption ko backend se fetch kro
  useEffect(() => {
     axios.get(`http://localhost:8080/userVotes/vote?username=${user}&pollId=${pollId}`)
    .then(response => {
      setVotedOption(response.data.voteOptionIndex)
      })
    .catch(err => console.log(err))
  }, [pollId])

  //get liked and disliked on poll change
  useEffect(() => {
    axios.get(`http://localhost:8080/likeDislike/like?username=${user}&pollId=${pollId}`)
    .then(response => {
      setLiked(response.data)
      })
    .catch(err => console.log(err))
    axios.get(`http://localhost:8080/likeDislike/dislike?username=${user}&pollId=${pollId}`)
    .then(response => {
      setDisliked(response.data)
      })
    .catch(err => console.log(err))

  }, [pollId, poll])

  async function handleVote(optionIndex){

    if(expired){
      console.log("Poll Expired!!!")
      return
    }

    if(!currentClient || !currentClient.connected){ 
      console.log("client not connected")
      return 
    }

    if(!user){
      document.querySelector('dialog').showModal()
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
    console.log(voteMessage)

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
    const res = await axios.post(`http://localhost:8080/userVotes`, userVotes)

    console.log(res.data)

  }

  function handleLike(){

    if(expired){
      console.log("Poll Expired!!!")
      return
    }

    if(!user){
      document.querySelector('dialog').showModal()
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

    if(expired){
      console.log("Poll Expired!!!")
      return
    }

    if(!user){
      document.querySelector('dialog').showModal()
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
      <LeftSideBar />
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

import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const MyPoll = ({ styles, poll, updating, setUpdating }) => {

  const navigate = useNavigate()

  const [showOptions, setShowOptions] = useState(false)

  async function handlePollDelete(){

    //need to show delete confirmation window on click
    const resp = await axios.delete(`http://localhost:8080/poll/${poll.id}`)
    setUpdating(!updating)
    console.log(resp.data)

  }

  return(

    <div className={styles.myPoll}>

      {!showOptions 
      ? 
        <div className={styles.front}>

          <h2>{poll.title}</h2>
          <div className={styles.myPollStats}>
            <h4>{poll.totalVotes} Votes</h4>
            <h4>{poll.likes}👍🏻</h4>
            <h4>{poll.dislikes}👎🏻</h4>
          </div>
          <button onClick={() => setShowOptions(true)}>Options</button>

        </div>
      : 
        <div className={styles.back}>

          <h2>{poll.title}</h2>
          <div>
            <button onClick={() => navigate(`/polls/${poll.id}`)}>Open</button>
            <button onClick={handlePollDelete}>Delete</button>
            <button>Info</button>
            <button onClick={() => setShowOptions(false)}>Cancel</button>
          </div>


        </div>
      }


    </div>

  )

}

export default MyPoll

import axios from "axios"
import { useState } from "react"

const MyPoll = ({ styles, poll }) => {

  const [showOptions, setShowOptions] = useState(false)

  async function handlePollDelete(){

    //need to show delete confirmation window on click
    const resp = await axios.delete(`http://localhost:8080/poll/${poll.id}`)

    return(

      <div className={styles.deleteConfirmation}>
        <h2>Delete This Poll</h2>
        <h3>This Action cannot of Reversed</h3>
        <button>Yes</button>
        <button>No</button>
      </div>

    )

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
            <button>Open</button>
            <button>Delete</button>
            <button>Info</button>
            <button onClick={() => setShowOptions(false)}>Cancel</button>
          </div>


        </div>
      }


    </div>

  )

}

export default MyPoll

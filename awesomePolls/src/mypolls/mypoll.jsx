import axios from "axios"
import { useState } from "react"

const MyPoll = ({ styles, poll }) => {

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

    <div className={styles.myPoll} onClick={handlePollDelete}>

      <h2>{poll.title}</h2>
      <hr style={{border: "1px solid hsl(200, 70%, 70%)"}} />
      <div className={styles.myPollStats}>
        <h4>{poll.totalVotes} Votes</h4>
        <h4>{poll.likes}👍🏻</h4>
        <h4>{poll.dislikes}👎🏻</h4>
      </div>

    </div>

  )

}

export default MyPoll

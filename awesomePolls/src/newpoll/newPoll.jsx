import { useState } from "react";
import Navbar from "../navbar/navbar";
import styles from "./newPoll.module.css"
import axios from "axios";
import MessageWindow from "../messagewindow/messagewindow";
import useUserContext from "../pollProvider";
import LeftSideBar from "../leftsidebar/leftsidebar";
import { motion } from "framer-motion";

const NewPoll = () => {

  const { user } = useUserContext()

  const [options, setOptions] = useState(["", ""])
  const [message, setMessage] = useState(null)

  function handleAddOption(){
    const newOption = ""

    setOptions(o => [...o, newOption])
  }

  function handleRemoveOption(index){
    const updatedOptions = options.filter((_, i) => index !== i)
    setOptions(updatedOptions)
  }

  function handleInputChange(index, event){
    let newOptions = [...options]
    newOptions[index] = event.target.value
    setOptions(newOptions)
  }

  function handleCreatePoll(){
    const title = document.getElementById("newPollTitle").value
    const opts = options.filter(o => o !== "")
    const author = user
    const expiry = document.getElementById("expiry").value

    const newPoll = {
      title: title,
      options: opts,
      author: author,
      expiry: expiry
    }

    axios.post(`http://localhost:8080/poll`, newPoll)
    .then(response => setMessage(`${response.data} 👍`))
    .catch(err => console.log(err))

    setTimeout(() => setMessage(null), 2000)
  }

  return(

    <>
      <Navbar />

      <div className={styles.newPollAndSideBar}>
      <LeftSideBar />

      <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      transition={{duration: 0.3}} >

      {message !== null && <MessageWindow message={message} />}

      <div className={styles.newPoll}>

        <h1>Start a New Poll</h1>

        <div className={styles.pollTitle}>
          <h2>Title</h2>
          <input type="text" id="newPollTitle" />
        </div>

        <div className={styles.author}>
          <p>Expiry (in hours) : </p>
          <select className={styles.expiry} id="expiry">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
          <h2>{`Created By - ${user}`}</h2>
        </div>

        <div className={styles.pollChoices}>
          <h2>Choices</h2>
          <div className={styles.options}>
          {options.map((option, index) => (
            <div key={index} className={styles.option}>
              <p>{`Option ${index+1}`}</p>
              <input type="text" value={option} onChange={(e) => handleInputChange(index, e)} />
              <button onClick={() => handleRemoveOption(index)}>🗑️</button>
            </div>
          ))}
          </div>
        </div>

        <div className={styles.endButtons}>
          <button id={styles.addButton} onClick={handleAddOption}>Add Option</button>
          <button id={styles.createButton} onClick={handleCreatePoll}>Create Poll</button>
        </div>

      </div>
      </motion.div>

      </div>
    </>

  );

}

export default NewPoll

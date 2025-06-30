import { useEffect, useState } from "react";
import light from "./newPoll.module.css"
import dark from "./newpolldark.module.css"
import axios from "axios";
import MessageWindow from "../messagewindow/messagewindow";
import useUserContext from "../pollProvider";
import LeftSideBar from "../leftsidebar/leftsidebar";
import { motion } from "framer-motion";
import PreviewPoll from "../previewpoll/previewpoll";
import ExpirySlider from "../expiryslider/expiryslider";

const NewPoll = () => {

  const { user, theme } = useUserContext()

  const styles = theme ? light : dark

  const [options, setOptions] = useState(["", ""])
  const [message, setMessage] = useState(null)
  const [previewOpened, setPreviewOpened] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedExpiry, setSelectedExpiry] = useState(1)

  const [width, setWidth] = useState(window.innerWidth)

  function handleResize(){
    setWidth(window.innerWidth)
  }

  useEffect(() => {

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)

  }, [])

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

    if(!user){
      showLoginOverlay()
      return
    }

    const title = document.getElementById("newPollTitle").value
    const opts = options.filter(o => o !== "")
    const author = user
    const expiry = selectedExpiry

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

  function handleTitleChange(){
    setTitle(document.getElementById("newPollTitle").value)
  }

  function showLoginOverlay(){

    const dialog = document.querySelector("dialog")
    dialog && dialog.showModal()
  }

  return(

    <>
      <LeftSideBar />

      <motion.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      exit={{opacity: 0}} 
      transition={{duration: 0.3}} >

      {message !== null && <MessageWindow message={message} />}

        <div className={styles.pollAndPreviewContainer}>
      <div className={styles.newPoll} style={{
            transform: `${previewOpened 
              ? "translateX(0)" 
              : width > 1000 ? "translateX(100px)" : "translateX(0)"}`
          }}>

        <h1>Start a New Poll</h1>

        <div className={styles.pollTitle}>
          <h2>Title</h2>
          <input type="text" id="newPollTitle" onChange={handleTitleChange} />
        </div>

        <ExpirySlider times={[1, 2, 3, 6, 12, 24]} setSelectedExpiry={setSelectedExpiry}/>

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

        <PreviewPoll setPreviewOpened={setPreviewOpened} title={title} options={options} />

      </div>
      </motion.div>

    </>

  );

}

export default NewPoll

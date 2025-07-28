import light from "./toast.module.css"
import dark from "./toastdark.module.css"
import useUserContext from "../pollProvider"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const Toast = ({ toast, type }) => {

  const { theme } = useUserContext()
  const styles = theme ? light : dark

  const [message, setMessage] = useState(toast)

  let backgroundColor

  if(type === "success"){
    backgroundColor = "hsl(120, 50%, 90%)"
  }
  else if(type === "error"){
    backgroundColor = "hsl(0, 50%, 90%)"
  }
  else{
    backgroundColor = "hsl(45, 100%, 90%)"
  }

  useEffect(() => {
    setTimeout(() => setMessage(null), 3000)
  }, [])

  return(

    <AnimatePresence>
      {message && <motion.div
        initial={{opacity: 0, y: `-50px`, scaleX: 0.1}} 
        animate={{opacity: 1, y: 0, scaleX: 1}} 
        exit={{opacity: 0}} 
        transition={{duration: 0.2}}>

        <div className={styles.toast} style={{
          backgroundColor: backgroundColor
        }}>

          <h2>{message}</h2>

        </div>

      </motion.div>}
    </AnimatePresence>

  )

}

export default Toast

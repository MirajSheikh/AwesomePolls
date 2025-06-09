import useUserContext from "../pollProvider"
import light from "./previewpoll.module.css"
import dark from "./previewpolldark.module.css"
import { useState } from "react"

const PreviewPoll = () => {

  const { theme } = useUserContext()

  const [preview, setPreview] = useState(false)

  const styles = theme ? light : dark

  return(

    <div className={styles.previewContainer}>

      {preview && <h1 className={styles.previewTitle}>Title</h1>}

      {preview && <div className={styles.options}>
        <div className={styles.option}>
          <h2>Option</h2>
          <h3>Votes</h3>
        </div>
      </div>}

      {preview && <div className={styles.stats}>
        <h2>Total Votes</h2>
        <div>
          <h3>Likes</h3>
          <h3>Dislikes</h3>
          <h3>🩷</h3>
        </div>
      </div>}

      {preview 
        ? <button onClick={() => setPreview(false)}>Hide Preview</button> 
        : <button onClick={() => setPreview(true)}>Show Preview</button>}

    </div>

  )

}

export default PreviewPoll

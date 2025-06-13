import useUserContext from "../pollProvider"
import light from "./previewpoll.module.css"
import dark from "./previewpolldark.module.css"
import { useState } from "react"

const PreviewPoll = ({ setPreviewOpened, title, options }) => {

  const { theme } = useUserContext()

  const [preview, setPreview] = useState(false)

  const styles = theme ? light : dark

  return(

    <div className={styles.previewContainer} 
      style={{
        backgroundColor: theme 
          ? `${preview ? "hsl(200, 70%, 70%)" : "hsla(200, 70%, 95%, 0)"}` 
          : `${preview ? "hsl(200, 5%, 20%)" : "hsla(200, 5%, 10%, 0)"}`,
        padding: `${preview ? "200px 50px" : "200px 0"}`,
        width: `${preview ? "300px" : "max-content"}`
      }}>

      {preview && <h1 className={styles.previewTitle}>{`${title === "" ? "Title" : title}`}</h1>}

      {preview && <div className={styles.options}>
        {options.map((option, i) => (
          <div key={i} className={styles.option}>
            <h2>{option === "" ? `Option ${i+1}` : option}</h2>
            <h3>0 Votes</h3>
          </div>
        ))}
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
        ? <button id={styles.hidePreviewButton} onClick={() => {
          setPreview(false)
          setPreviewOpened(false)
        }} >Hide Preview</button> 
        : <button id={styles.showPreviewButton} onClick={() => {
          setPreview(true)
          setPreviewOpened(true)
        }} >Show Preview</button>}

    </div>

  )

}

export default PreviewPoll

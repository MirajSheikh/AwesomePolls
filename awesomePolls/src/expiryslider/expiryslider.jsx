import { useState } from "react"
import useUserContext from "../pollProvider"
import light from "./expiryslider.module.css"
import dark from "./expirysliderdark.module.css"

const ExpirySlider = ({ times, setSelectedExpiry }) => {

  const { theme } = useUserContext()

  const styles = theme ? light : dark

  const [selection, setSelection] = useState(0)

  return(

    <div className={styles.slider}>

      <h2 className={styles.expiryText}>Expiry</h2>

      <div className={styles.line}>
        {times.map((time, i) => 
          <div key={i}>
            <div className={selection === i ? styles.selection : styles.dot} onClick={() => {
              setSelection(i)
              setSelectedExpiry(time)
            }}></div>
          </div>
        )}

      </div>

      <div className={styles.expiryTimes}>
        {times.map((time, i) => 
          <div key={i}>
            <h2>{time}</h2>
          </div>
        )}
      </div>

    </div>

  )

}

export default ExpirySlider

import { useState } from "react"
import useUserContext from "../pollProvider"
import light from "./expiryslider.module.css"
import dark from "./expirysliderdark.module.css"

const ExpirySlider = () => {

  const dots = new Array(5).fill(0)
  const { theme } = useUserContext()

  const styles = theme ? light : dark

  const [selection, setSelection] = useState(-1)

  return(

    <div className={styles.slider}>

      <div className={styles.line}>
        {dots.map((dot, i) => 
          <div key={i}>
            <div className={styles.dot}></div>
          </div>
        )}
      </div>

    </div>

  )

}

export default ExpirySlider

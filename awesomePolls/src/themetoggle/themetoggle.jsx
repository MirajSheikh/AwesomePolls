import styles from "./themetoggle.module.css"
import useUserContext from "../pollProvider"
import { useEffect } from "react"

const ThemeToggle = () => {

  const { theme, setTheme } = useUserContext()

  useEffect(() => {

    const body = document.getElementsByTagName("body")
    const toggle = document.getElementById("toggle")
    const ball = document.getElementById("ball")

    if(theme){
      body[0].style.backgroundColor = "hsl(200, 70%, 95%)"
      toggle.style.backgroundColor = "hsl(200, 5%, 10%)"
      ball.style.borderColor = "hsl(200, 5%, 0%)"
    }
    else{
      body[0].style.backgroundColor = "hsl(200, 5%, 10%)"
      toggle.style.backgroundColor = "hsl(200, 5%, 50%)"
      ball.style.borderColor = "hsl(200, 5%, 50%)"
    }

  }, [theme])

  return(

    <div id="toggle" className={styles.toggle}>

      <div id="ball" className={styles.ball} onClick={() => setTheme(!theme)} 
        style={{
          transform: `translateX(${theme ? '0' : '30px'})`,
          backgroundColor: `${theme ? 'hsl(45, 100%, 70%)' : 'hsl(200, 5%, 10%)'}`
        }}>
        {theme ? <h4>🌞</h4> : <h4>🌛</h4>}
      </div>

    </div>

  )

}

export default ThemeToggle

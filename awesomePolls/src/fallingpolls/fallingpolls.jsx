import { useState, useEffect } from "react"
import styles from "./fallingpolls.module.css"
import useUserContext from "../pollProvider"

const FallingPolls = () => {

  const { theme } = useUserContext()

  const [fallingObjects, setFallingObjects] = useState([])

  useEffect(() => {

    setFallingObjects([])

    function generateRandomFallingObjects(){

      let rain = [];

      for(let i = 0; i < 20; i++){

        const posx = Math.min(Math.floor(Math.random() * window.innerWidth), window.innerWidth - 75)
        const posy = 0
        const s = Math.max(Math.floor(Math.random() * 50), 15)
        const time = Math.max(Math.random() * 5, 2)

        const obj = {
          height: `${s}px`,
          width: `${s}px`,
          top: `${posy}px`,
          left: `${posx}px`,
          time: `${time}s`,
        }

        rain = [...rain, obj]

      }

      setFallingObjects([...rain])

    }

    generateRandomFallingObjects()

  }, [])

  return(

    <div className={styles.fallingPolls}>


      {fallingObjects.length > 0 && fallingObjects.map((fo, i) => (

        <div key={i} style={{
          height: fo.height,
          width: fo.width,
          top: fo.top,
          left: fo.left,
          animation: `${styles.fall} ${fo.time} ease-in infinite`,
          border: `${theme ? '5px solid hsl(0, 70%, 70%)' : '5px solid hsl(200, 70%, 70%)'}`
        }}></div>

      ))}

    </div>

  )

}

export default FallingPolls

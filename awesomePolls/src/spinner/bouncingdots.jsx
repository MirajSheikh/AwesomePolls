import styles from "./bouncingdots.module.css"

const BouncingDots = ({ size }) => {

  return(

    <div className={styles.bouncingDotsContainer} 
      style={{transform: `scale(${size})`}}>
      <div></div>
      <div></div>
      <div></div>
    </div>

  )

}

export default BouncingDots

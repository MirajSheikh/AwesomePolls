import styles from "./spinner.module.css"

const Spinner = ({ size }) => {

  const diameter = size === "big" ? `60px` : `30px`
  const border = size === "big" ? `12px solid hsl(200, 70%, 90%)` : `6px solid hsl(200, 70%, 90%)`
  const borderTop = size === "big" ? `12px solid hsl(200, 70%, 50%)` : `6px solid hsl(200, 70%, 50%)`

  return(

    <div className={styles.loader} 
      style={{
        height: `${diameter}`, 
        width: `${diameter}`,
        border: `${border}`,
        borderTop: `${borderTop}`
      }}>
    </div>

  )

}

export default Spinner

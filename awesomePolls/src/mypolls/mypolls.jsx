import useUserContext from "../pollProvider"
import light from "./mypolls.module.css"
import dark from "./mypollsdark.module.css"

const MyPolls = () => {

  const { theme } = useUserContext()

  const styles = theme ? light : dark

  return(

    <div className={styles.myPolls}>

      

    </div>

  )

}

export default MyPolls

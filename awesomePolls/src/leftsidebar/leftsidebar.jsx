import styles from "./leftsidebar.module.css"
import useUserContext from "../pollProvider"

const LeftSideBar = () => {

  const { setUser } = useUserContext()

  return(

    <div className={styles.leftSideBar}>

      <div className={styles.filters}>
        
      </div>
     
      <div className={styles.settings}>
        <button>Profile</button>
        <button>Your Polls</button>
        <button onClick={() => navigate("/polls")}>Explore</button>
        <button onClick={() => navigate("/new")}>New Poll</button>
        <button>Settings</button>
        <button>Favorites</button>
        <button>Most Voted Polls</button>
        <button onClick={() => {
          setUser(null)
          navigate("/")
        }}>Logout</button>
      </div>


    </div>

  )

}

export default LeftSideBar

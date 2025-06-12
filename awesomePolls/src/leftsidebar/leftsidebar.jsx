import light from "./leftsidebar.module.css"
import dark from "./leftsidebardark.module.css"
import useUserContext from "../pollProvider"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LeftSideBar = () => {

  const { theme, setUser } = useUserContext()

  const navigate = useNavigate()

  const styles = theme ? light : dark

  const [collapsed, setCollapsed] = useState(true)
  const [width, setWidth] = useState(window.innerWidth)

  function getWindowWidth(){
    setWidth(window.innerWidth)
  }

  useEffect(() => {

    window.addEventListener("resize", getWindowWidth)

    return () => {window.removeEventListener("resize", getWindowWidth)}

  }, [])

  useEffect(() => {
    if(width < 700){
      setCollapsed(true)
    }
  }, [width])

  return(

    <div className={collapsed ? styles.collapsedSideBar : styles.expandedSideBar} style={{zIndex: "2"}}>

      <div className={styles.filters}>
        
      </div>
     
      <div className={styles.settings}>
        <div 
          onClick={() => setCollapsed(!collapsed)} 
          style={{justifyContent: `${collapsed ? "start" : "end"}`}}>
          <img src="https://placehold.co/80" />
        </div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Profile</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Your Polls</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Explore</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>New Poll</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Settings</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Favorites</button>}</div>
        <div>{collapsed ? <img src="https://placehold.co/40" /> : <button>Most Voted Polls</button>}</div>
        <div>{collapsed 
          ? <img src="https://placehold.co/40" /> 
          : <button onClick={() => {
            setUser(null)
            navigate("/")
          }
          }>Logout</button>}
        </div>
      </div>


    </div>

  )

}

export default LeftSideBar

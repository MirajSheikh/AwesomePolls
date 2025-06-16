import { useEffect, useState } from "react"
import useUserContext from "../pollProvider"
import light from "./mypolls.module.css"
import dark from "./mypollsdark.module.css"
import axios from "axios"
import Spinner from "../spinner/spinner"
import { useNavigate } from "react-router-dom"
import MyPoll from "./mypoll"
import LeftSideBar from "../leftsidebar/leftsidebar"

const MyPolls = () => {

  const navigate = useNavigate()

  const { user, theme } = useUserContext()

  const styles = theme ? light : dark

  const [myPolls, setMyPolls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function getMyPolls(){

      const start = Date.now()

      const userPolls = await axios.get(`http://localhost:8080/poll/mypolls?author=${user}`)

      const elapsed = Date.now() - start
      const minWait = 1000

      setTimeout(() => {
        setLoading(false)
        setMyPolls(userPolls.data)
      }, Math.max(0, minWait - elapsed))


    }

    getMyPolls()

  }, [user])

  return(

    <>
      <LeftSideBar />

      <div className={styles.myPolls}>

        <h1>My Polls</h1>

        {loading 

          ? <Spinner /> 

          : myPolls.length > 0 

            ? <div className={styles.myPollsList}>
              {myPolls.map((poll, i) => (

                <div key={i}>
                  <MyPoll styles={styles} poll={poll} />
                </div>

              ))}
            </div>

            : <div className={styles.noPolls}>
              <h2>You have not Created Any Polls Yet 🥺</h2>
              <h3>You can Manage your Polls here!</h3>
              <button onClick={() => navigate("/new")}>New Poll</button>
            </div>

        }

      </div>
    </>

  )

}

export default MyPolls

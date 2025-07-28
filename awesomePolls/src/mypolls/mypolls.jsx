import { useEffect, useState } from "react"
import useUserContext from "../pollProvider"
import light from "./mypolls.module.css"
import dark from "./mypollsdark.module.css"
import Spinner from "../spinner/spinner"
import { useNavigate } from "react-router-dom"
import MyPoll from "./mypoll"
import LeftSideBar from "../leftsidebar/leftsidebar"

import axiosClient from "../axiosClient"

const MyPolls = () => {

  const token = sessionStorage.getItem("token")

  const navigate = useNavigate()

  const { user, setUser, theme, addToast } = useUserContext()

  const styles = theme ? light : dark

  const [myPolls, setMyPolls] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {

    async function getMyPolls(){

      const start = Date.now()

      const userPolls = await axiosClient.get(`poll/mypolls?author=${user}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .catch(() => {
        addToast("Session Expired! Please Login Again", "error")
          setMyPolls([])
          setUser(null)
          navigate("/signin?status=session_expired")
          return
        })

      const elapsed = Date.now() - start
      const minWait = 1000

      setTimeout(() => {
        setLoading(false)
        setMyPolls(userPolls.data)
      }, Math.max(0, minWait - elapsed))


    }

    getMyPolls()

  }, [user, updating])

  return(

    <>
      <LeftSideBar />

      <div className={styles.myPolls}>

        <h1>My Polls</h1>

        {loading 

          ? <div style={{margin: `auto`, marginTop: `50px`}}>
            <Spinner size="big" />
          </div> 

          : myPolls.length > 0 

            ? <div className={styles.myPollsList}>
              {myPolls.map((poll, i) => (

                <div key={i}>
                  <MyPoll styles={styles} poll={poll} updating={updating} setUpdating={setUpdating} />
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

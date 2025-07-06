import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Signin = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleUsernameChange(event){
    setUsername(event.target.value)
  }
  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  async function handleSignin(){
    const user = {
      username: username,
      password: password
    }

    const res = await axios.post(`http://localhost:8080/signin`, user)

    console.log(res.data)

    navigate("/")
  }

  return(

    <div style={{marginTop: `100px`}}>

      <input type="text" id="username1" onChange={handleUsernameChange} />
      <input type="password" id="password1" onChange={handlePasswordChange} />
      <button onClick={handleSignin}>Sign In</button>

    </div>

  )

}

export default Signin

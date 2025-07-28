import { useContext, useState } from "react"
import { userContext } from "./contexts"
import { jwtDecode } from "jwt-decode"

export const PollProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const token = sessionStorage.getItem("token")
    if(token){
      return jwtDecode(token).sub
    }
    else{
      return null
    }
  })
  const [theme, setTheme] = useState(false)

  const [toastList, setToastList] = useState([[]])

  function addToast(message, type){
    setToastList(tl => [...tl, [message, type]])
  }

  return(

    <userContext.Provider value={{user, setUser, theme, setTheme, toastList, setToastList, addToast}}>{children}</userContext.Provider>

  )

}

const useUserContext = () => useContext(userContext)
export default useUserContext

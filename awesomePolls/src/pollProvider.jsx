import { useContext, useState } from "react"
import { userContext } from "./contexts"

export const PollProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(true)

  return(

    <userContext.Provider value={{user, setUser, theme, setTheme}}>{children}</userContext.Provider>

  )

}

const useUserContext = () => useContext(userContext)
export default useUserContext

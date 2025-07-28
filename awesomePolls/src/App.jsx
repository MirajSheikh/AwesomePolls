window.global = window

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home/home"
import NewPoll from "./newpoll/newPoll"
import Explore from "./explore/explore"
import Vote from "./vote/vote"
import Navbar from "./navbar/navbar"
import MyPolls from "./mypolls/mypolls"
import Signin from "./signin/signin"
import Register from "./signin/register"
import ToastList from "./toast/toastlist"
import useUserContext from "./pollProvider"
import { AnimatePresence } from "framer-motion"

function App() {

  const { toastList } = useUserContext()

  return (
    <>

      <BrowserRouter>

        <Navbar />
        <ToastList list={toastList} />
        <AnimatePresence>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPoll />} />
            <Route path="/polls" element={<Explore />} />
            <Route path="/polls/:pollId" element={<Vote />} />
            <Route path="/mypolls" element={<MyPolls />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </AnimatePresence>

      </BrowserRouter>

    </>
  )
}

export default App

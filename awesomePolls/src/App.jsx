window.global = window

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home/home"
import NewPoll from "./newpoll/newPoll"
import Explore from "./explore/explore"
import Vote from "./vote/vote"
import { PollProvider } from "./pollProvider"
import Login from "./login/login"
import Navbar from "./navbar/navbar"
import MyPolls from "./mypolls/mypolls"
import Signin from "./signin/signin"

function App() {

  return (
    <>

      <BrowserRouter>

        <PollProvider>
          <Login />
          <Navbar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewPoll />} />
            <Route path="/polls" element={<Explore />} />
            <Route path="/polls/:pollId" element={<Vote />} />
            <Route path="/mypolls" element={<MyPolls />} />
            <Route path="/signin" element={<Signin />} />

          </Routes>
        </PollProvider>

      </BrowserRouter>

    </>
  )
}

export default App

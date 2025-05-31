window.global = window

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./home/home"
import NewPoll from "./newpoll/newPoll"
import Explore from "./explore/explore"
import Vote from "./vote/vote"
import { PollProvider } from "./pollProvider"

function App() {

  return (
    <>

      <BrowserRouter>

        <PollProvider>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPoll />} />
          <Route path="/polls" element={<Explore />} />
          <Route path="/polls/:pollId" element={<Vote />} />

        </Routes>
        </PollProvider>

      </BrowserRouter>

    </>
  )
}

export default App

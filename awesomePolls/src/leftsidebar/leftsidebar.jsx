import styles from "./leftsidebar.module.css"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useUserContext from "../pollProvider"

const LeftSideBar = ({ setInput, setSearched }) => {

  const { setUser } = useUserContext()

  const navigate = useNavigate()

  const searchListRef = useRef(null)
  const searchBarRef = useRef(null)

  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {

    function handleCloseSearchList(e){
      if(searchListRef.current && 
        searchBarRef.current && 
        !searchBarRef.current.contains(e.target) &&
        !searchListRef.current.contains(e.target)){
        setSearchResult([])
      }
    }

    document.addEventListener("click", handleCloseSearchList, true)

    return () => {
      document.removeEventListener("click", handleCloseSearchList, true)
    }
  }, [])

  useEffect(() => {

    var polls = []

    axios.get(`http://localhost:8080/poll/titles`)
    .then(response => {
        polls = response.data

        searchInput !== "" 
          ? setSearchResult(polls.filter((poll) => poll.toLowerCase().includes(searchInput.toLowerCase()))) 
          : setSearchResult([])
      })
    .catch(err => console.log(err))

  }, [searchInput])


  function handleOnSearchInputChange(event){
    setSearchInput(event.target.value)
  }

  function handleListItemClick(item){
    document.getElementById("searchBar").value = item
    setSearchResult([])
  }

  function handleSearch(){
    setSearched(true)
    setInput(document.getElementById("searchBar").value)
  }

  return(

    <div className={styles.leftSideBar}>

      <div className={styles.search}>
        <input type="text" id="searchBar" placeholder="Search..." autoComplete="off" onChange={handleOnSearchInputChange} ref={searchBarRef} ></input>
        <button className={styles.searchButton} onClick={handleSearch}>🔍</button>
      </div>
      
        {searchResult.length > 0 && (
        <div className={styles.searchList} ref={searchListRef}>

          {searchResult.map((item, i) => (
            i < 5 && <h3 key={i} className={styles.searchItem} onClick={() => handleListItemClick(item)}>  
              {item}
            </h3>))}

        </div>
      )}

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

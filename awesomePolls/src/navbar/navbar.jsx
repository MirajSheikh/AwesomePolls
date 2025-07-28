import { Link, useNavigate } from "react-router-dom";
import light from "./navbar.module.css"
import dark from "./navbardark.module.css"
import ThemeToggle from "../themetoggle/themetoggle";
import useUserContext from "../pollProvider";
import SearchBar from "../searchbar/searchbar";
import { useState } from "react";
import Spinner from "../spinner/spinner";

const Navbar = () => {

  const { theme, user, setUser, addToast } = useUserContext()

  const styles = theme ? light : dark

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  function handleLogin(){
    navigate("/signin")
  }

  function handleLogout(){
    setLoading(true)
    setUser(null)
    sessionStorage.clear()
    addToast("Signing out...", "warn")
    setTimeout(() => {
      navigate("/signin?status=logged_out")
      setLoading(false)
      addToast("Logged out", "success")
    }, 1000)
  }

  return(

    <>
      <div className={styles.navbar}>
        
        <div className={styles.navLeft}>
          <Link to="/">AwesomePolls</Link>
        </div>

        <div className={styles.navMid}>
          <SearchBar />
        </div>

        <div className={styles.navRight}>
          {user 
            ? <h3 className={styles.navUsername}>{user}</h3> 
            : <button className={styles.navLoginButton} onClick={handleLogin}>Login</button>}
          {loading 
            ? <Spinner size="1" /> 
            : user && <button className={styles.navLogoutButton} onClick={handleLogout}>Logout</button>}
          <ThemeToggle />
        </div>

      </div>
    </>


  );

}

export default Navbar

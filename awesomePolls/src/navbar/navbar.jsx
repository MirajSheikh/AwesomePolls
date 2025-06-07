import { Link, useNavigate } from "react-router-dom";
import light from "./navbar.module.css"
import dark from "./navbardark.module.css"
import ThemeToggle from "../themetoggle/themetoggle";
import useUserContext from "../pollProvider";
import SearchBar from "../searchbar/searchbar";

const Navbar = () => {

  const { theme, user, setUser } = useUserContext()

  const styles = theme ? light : dark

  const navigate = useNavigate()

  function showLoginOverlay(){

    const dialog = document.querySelector("dialog")
    dialog.showModal()
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
          {user ? <h3 className={styles.navUsername}>{user}</h3> : <button className={styles.navLoginButton} onClick={showLoginOverlay}>Login</button>}
          <button className={styles.navLogoutButton} onClick={() => {
            setUser(null)
            navigate("/")
          }}>Logout</button>
          <ThemeToggle />
        </div>

      </div>
    </>


  );

}

export default Navbar

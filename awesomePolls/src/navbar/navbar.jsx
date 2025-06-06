import { Link, useNavigate } from "react-router-dom";
import light from "./navbar.module.css"
import dark from "./navbardark.module.css"
import ThemeToggle from "../themetoggle/themetoggle";
import useUserContext from "../pollProvider";
import SearchBar from "../searchbar/searchbar";

const Navbar = () => {

  const { theme, setUser } = useUserContext()

  const styles = theme ? light : dark

  const navigate = useNavigate()

  function showLoginOverlay(){

    const overlay = document.getElementById("loginOverlay")
    overlay.style.display = "block"

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
          <button onClick={showLoginOverlay}>Login</button>
          <button onClick={() => {
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

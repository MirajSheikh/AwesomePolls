import { Link } from "react-router-dom";
import styles from "./navbar.module.css"

const Navbar = () => {

  return(

    <>
      <div className={styles.navbar}>
        
        <div className={styles.navLeft}>
          <Link to="/">AwesomePolls</Link>
        </div>



      </div>
    </>


  );

}

export default Navbar

import { useNavigate } from "react-router-dom";
import useUserContext from "../pollProvider";
import lightStyles from "./home.module.css"
import darkStyles from "./homedark.module.css"
import { motion } from "framer-motion";
import SamplePoll from "../samplepoll/samplepoll";
import FallingPolls from "../fallingpolls/fallingpolls";

const Home = () => {

  const { theme } = useUserContext()

  const navigate = useNavigate();

  return(

    <motion.div 
      initial={{opacity: 0, x: -20}} 
      animate={{opacity: 1, x: 0}} 
      transition={{duration: 0.3}} 
      exit={{opacity: 0, x: 20}}>

      <div className={theme ? lightStyles.homePage : darkStyles.homePage}>

        <FallingPolls />


        <div className={theme ? lightStyles.home : darkStyles.home}>

          <div className={theme ? lightStyles.homeContent : darkStyles.homeContent}>

            <h1 id={theme ? lightStyles.homeTitle : darkStyles.homeTitle}>AwesomePolls</h1>
            <h2 id={theme ? lightStyles.homeSubTitle : darkStyles.homeSubTitle}>You want Polls? We Got'em!! </h2>

            <div className={theme ? lightStyles.homeButtons : darkStyles.homeButtons}>
              <button onClick={() => navigate("/new")}>Make a Poll</button>
              <button onClick={() => navigate("/polls")}>Explore</button>
            </div>

          </div>

          <div className={theme ? lightStyles.homeImage : darkStyles.homeImage}>
            <SamplePoll />
          </div>

        </div>

        <hr style={theme 
          ? {margin: "0.5rem 3rem", border: "1px solid hsl(200, 70%, 40%)"}
          : {margin: "0.5rem 3rem", border: "1px solid hsl(200, 5%, 95%)"}}/>

        <div className={theme ? lightStyles.stats : darkStyles.stats}>
          <div className={theme ? lightStyles.statsLeft : darkStyles.statsLeft}>
            <h2>1M+</h2>
            <h3>Total Voters</h3>
          </div>

          <div className={theme ? lightStyles.statsRight : darkStyles.statsRight}>
            <h2>10,000+</h2>
            <h3>Active Polls</h3>
            
          </div>
        </div>


      </div>

    </motion.div>
  );

}

export default Home

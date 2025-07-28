import useUserContext from "../pollProvider"
import styles from "./samplepoll.module.css"
import darkStyles from "./samplepolldark.module.css"

const SamplePoll = () => {

  const { theme, addToast } = useUserContext()

  const css = theme ? styles : darkStyles

  return(

    <div className={css.samplePoll}>

      <div className={css.spTitle}>
        <h2>What's Your Favorite Pet Animal</h2>
      </div>

      <div className={css.spOptions}>
        <div>
          <h3>Dogs 👑</h3><p>2.7k votes</p>
        </div>
        <div>
          <h3>Cats</h3><p>2.4k votes</p>
        </div>
        <div>
          <h3>Rabbits</h3><p>753 votes</p>
        </div>
        <div>
          <h3>Birds</h3><p>304 votes</p>
        </div>

      </div>

      <div className={css.spStats}>
        <div>
          <div><h2>6,198 votes</h2></div>
          <div>
            <button onClick={() => addToast("Like Clicked", "success")}>1.5k👍🏻</button>
            <button onClick={() => addToast("Dislike Clicked", "error")}>109👎🏻</button>
            <button onClick={() => addToast("Feature Not Available Yet", "warn")}>🩷</button>
          </div>
        </div>
      </div>

    </div>

  )

}

export default SamplePoll

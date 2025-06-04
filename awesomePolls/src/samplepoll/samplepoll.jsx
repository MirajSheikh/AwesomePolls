import styles from "./samplepoll.module.css"

const SamplePoll = () => {

  return(

    <div className={styles.samplePoll}>

      <div className={styles.spTitle}>
        <h2>What's Your Favorite Pet Animal</h2>
      </div>

      <div className={styles.spOptions}>
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

      <div className={styles.spStats}>
        <div>
          <div><h2>6,198 votes</h2></div>
          <div>
            <button>1.5k👍🏻</button>
            <button>109👎🏻</button>
            <button>🩷</button>
          </div>
        </div>
      </div>

    </div>

  )

}

export default SamplePoll

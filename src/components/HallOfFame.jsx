import styles from "../css/stadiums.module.css"

function HallOfFame() {
  return (

    <div className={styles.body}>
        <h1 className={styles.h1TitleFame}>Hall of Fame </h1>

        <h1 className={styles.h1TitleFame} > Coming Soon...</h1>
        
        <img className={styles.gif} src="/images/charmander.gif" alt="dragonite" />
    </div>
  )
}

export default HallOfFame
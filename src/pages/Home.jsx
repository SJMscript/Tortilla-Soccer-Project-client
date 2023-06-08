import styles from "../css/home.module.css";

function Home() {
  return (
      <div className={styles.home}>
      <div className="home-div">
        <h1 className={styles.h1TitleHome}>Tortilla Soccer</h1>
        <h3 className={styles.h3SubtitleHome}>Created by Juan Diego y Santiago</h3>
      </div>
        <section>
          <img src="/images/españa.jpg" alt="esp" />
          <img src="/images/españa1.jpg" alt="esp" />
          <img src="/images/españa2.jpg" alt="esp" />
          <img src="/images/españa3.jpg" alt="esp" />
          <img src="/images/españa4.jpg" alt="esp" />
          <img src="/images/españa5.jpg" alt="esp" />
          <img src="/images/españa6jpg.jpg" alt="esp" />
        </section>
        </div>
  );
}

export default Home;
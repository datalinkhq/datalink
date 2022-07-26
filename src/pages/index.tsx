import type { NextPage } from "next";
import DashboardExample from "../components/DashboardExample";
import styles from "../styles/pages/home.module.css";
const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <DashboardExample />
        <div className={styles.info}>
          <h1>Keep track of everything.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            delectus enim porro modi repudiandae dolores commodi repellat! Illum
            quis, dolorum ea nostrum consequuntur fugiat distinctio quisquam
            tenetur ratione? Vitae, magni?
          </p>
        </div>
        <div className={styles.info}>
          <h1>Easy to implement.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            delectus enim porro modi repudiandae dolores commodi repellat! Illum
            quis, dolorum ea nostrum consequuntur fugiat distinctio quisquam
            tenetur ratione? Vitae, magni?
          </p>
        </div>
      </div>
      <div className={styles.right}>
        <h3>Meet datalink.</h3>
        <h1>
          A futuristic and lightweight analytics platform for upcoming ROBLOX
          games.
        </h1>

        <div className={styles.buttons}>
          <a href="/">
            <span>Get Started</span>
            <i className="ri-arrow-right-up-line"></i>
          </a>
          <a href="/">
            <span>Pricing</span>
            <i className="ri-arrow-right-up-line"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;

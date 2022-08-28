import Link from "next/link"
import type { NextPage } from "next";
import DashboardExample from "../components/DashboardExample";
import styles from "../styles/pages/home.module.css";
const Home: NextPage = () => {
  return (
    <body>
      /* eslint-disable */
      <script>console.log("Hello there, fellow adventurer! 📣🧠")</script>
      /* eslint-enable */
      <div className={styles.home}>
        <div className={styles.left}>
          <DashboardExample />
          <div className={styles.info}>
            <h1>Keep track of everything.</h1>
            <p>
              Everything from simple player statistics, to custom events and feature flags. All in one place.
            </p>
          </div>
          <div className={styles.info}>
            <h1>Customizability to it&#39;s max.</h1>
            <p>
              Want something that isn&#39;t supported already? Want to add your own custom feature? Datalink supports it.
            </p>
          </div>
          <div className={styles.info}>
            <h1>Easy to implement.</h1>
            <p>
              Simply add a module script to your game, and set your token, you&#39;re good to go!
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Meet datalink.</h3>
          <h1>
            A futuristic and lightweight analytics platform for upcoming ROBLOX
            games.
          </h1>

          {/* <div className={styles.buttons}>
          <Link href="/">
            <a>
              <span>Get Started</span>
              <i className="ri-arrow-right-up-line"></i>
            </a>
          </Link>
          <Link href="/">
            <a>
              <span>Pricing</span>
              <i className="ri-arrow-right-up-line"></i>
            </a>
          </Link>
        </div> */}
        </div>
      </div>
    </body>
  );
};

export default Home;

// $$$$$$$\             $$\               $$\ $$\           $$\
// $$  __$$\            $$ |              $$ |\__|          $$ |
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  /
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|

// Copyright (c) 2022 Datalink Contributors. All rights reserved.

// This source code is licensed under the AGPL license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root
// directory of this source tree.

import Link from "next/link";
import DashboardExample from "../components/DashboardExample";
import styles from "../styles/pages/home.module.css";
import Script from "next/script";
import { NextPageWithLayout } from "../types";
import Navbar from "../layouts/navbar";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Script id="console-log">
        console.log("Hello there, fellow adventurer! 📣🧠")
      </Script>
      <div className={styles.home}>
        <div className={styles.left}>
          <DashboardExample />
          <div className={styles.info}>
            <h1>Keep track of everything.</h1>
            <p>
              Everything from simple player statistics, to custom events and
              feature flags. All in one place.
            </p>
          </div>
          <div className={styles.info}>
            <h1>Customizability to it&#39;s max.</h1>
            <p>
              Want something that isn&#39;t supported already? Want to add your
              own custom feature? Datalink supports it.
            </p>
          </div>
          <div className={styles.info}>
            <h1>Easy to implement.</h1>
            <p>
              Simply add a module script to your game, and set your token,
              you&#39;re good to go!
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <h3>Meet datalink.</h3>
          <h1>
            A futuristic and lightweight data platform for upcoming ROBLOX
            games.
          </h1>

          <div className={styles.buttons}>
            <Link href="https://docs.datalink.dev">
              <span>Get Started</span>
              <i className="ri-arrow-right-up-line"></i>
            </Link>
            {/* <Link href="/">
                <span>Pricing</span>
                <i className="ri-arrow-right-up-line"></i>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = Navbar;

export default Home;

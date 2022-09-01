import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const NavItems = () => {
    return (
      <ul>
        <li>
          <Link href="https://github.com/datalinkhq">
            <a>GitHub</a>
          </Link>
        </li>
        <li>
          <Link href="https://discord.gg/wME4WyNGyV">
            <a>Discord</a>
          </Link>
        </li>
      </ul>
    );
  };
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.burger}>
          <div
            className={styles.toggler}
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <span></span>
            <span></span>
          </div>
          <div
            className={styles.component}
            style={{
              opacity: dropdown ? `1` : `0`,
              transform: `scale(${dropdown ? `1` : `0`})`,
              pointerEvents: dropdown ? `all` : `none`
            }}
          >
            <div className={styles.complist}>
              <NavItems />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.branding}>
            <h1>Datalink</h1>
          </div>
          <div className={styles.list}>
            <NavItems />
          </div>
        </div>
        <div>
          {/* <a href="/login" className={styles.login}>
            <p className={styles.text}>Login</p>
            <i className="ri-arrow-right-up-line"></i>
          </a> */}
        </div>
      </div>
    </>
  );
}

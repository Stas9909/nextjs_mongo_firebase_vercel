import Link from "next/link"
import styles from "./HeaderNav.module.css"

const HeaderNav = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
              <Link href={"/"}>MainEvents</Link>
            </div>
            <nav className={styles.navigation}>
              <ul>
                <li>
                  <Link href={"/events"}>Every Events</Link>
                </li>
              </ul>
            </nav>
        </header>
    )
}

export default HeaderNav
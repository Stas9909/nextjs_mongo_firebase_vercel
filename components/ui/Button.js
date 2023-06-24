import Link from "next/link"
import styles from './Button.module.css'

const Button = (props) => {//пропс из FilteredEvents/EventItem (pathNameLink = `/events/${id}` => link={pathNameLink})/

  if (props.link) {
    return <Link href={props.link} passHref>
      <p className={styles.btn} style={{ textDecoration: "none" }}>{props.children}</p>
    </Link>
  }

  return <button className={styles.btn} onClick={props.onClick}>{props.children}</button>

}

export default Button
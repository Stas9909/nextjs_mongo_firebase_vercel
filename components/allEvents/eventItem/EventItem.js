import styles from './EventItem.module.css'
import Button from "@/components/ui/Button"
import DateIcon from "@/components/icons/DateIcon"
import AddressIcon from "@/components/icons/AddressIcon"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import Image from "next/image"

const EventItem = ({ title, image, date, location, id }) => {
  const moreCommonDateType = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedAddress = location.replace(', ', '\n')//replace - метод для замены текста в строке на др текст, В д.c мы заменяем запятую и пробел на перенос строки.

  const pathNameLink = `/events/${id}` 

  return <li className={styles.item}>
    <Image src={'/' + image} alt={title} width={500} height={320} priority={true}/>
    {/* <img src={'/' + image} alt={title} /> */}
    <div className={styles.outerContent}>
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
        </div>
        <div className={styles.date}>
          <DateIcon />
          <time>{moreCommonDateType}</time>
        </div>
        <div className={styles.address}>
          <AddressIcon />
          <address className={styles.addressName}>
            {formattedAddress}
          </address>
        </div>
      </div>
      <div className={styles.actions}>
        <Button link={pathNameLink}>
          <span>Event</span>
          <span className={styles.icon}><ArrowRightIcon /></span>
        </Button>
        {/* <Link href={pathNameLink}>Back to homePage</Link> */}
      </div>
    </div>
  </li>
}

export default EventItem
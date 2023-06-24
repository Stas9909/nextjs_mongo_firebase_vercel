import EventItem from '../eventItem/EventItem'
import styles from './EventList.module.css'

const EventList = ({ events }) => {

  return (
    <ul className={styles.list}>
      {events.map((event) => <EventItem
        id={event.id}
        title={event.title}
        location={event.location}
        date={event.date}
        image={event.image}
        key={event.id}
      />)}
    </ul>
  );
}

export default EventList
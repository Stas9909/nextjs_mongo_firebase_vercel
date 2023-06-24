import Image from 'next/image';
import AddressIcon from '../../icons/AddressIcon';//компонент svg
import DateIcon from '../../icons/DateIcon';//компонент svg
import LogisticsItem from '../logisticsItem/LogisticsItem';
import style from './EventLogistics.module.css';

function EventLogistics(props) {//props получаем из [eventId].js
  const { date, address, image, imageAlt } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const addressText = address.replace(', ', '\n');

  return (
    <section className={style.logistics}>
      <div className={style.image}>
        <Image src={`/${image}`} alt={imageAlt} width={400} height={400} priority={true}/>
      </div>
      <ul className={style.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
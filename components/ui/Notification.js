import styles from './Notification.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showNotification, hideNotification } from '@/Redux/notification/notificationActionCreator';

function Notification(props) {
  const notification = useSelector(state => state.notification.notification)
  const dispatch = useDispatch();

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  if (status === 'pending') {
    statusClasses = styles.pending;
  }

  const activeClasses = `${styles.notification} ${statusClasses}`;

  const hideNotificationHandler = () => {
    dispatch(hideNotification());
  };

  return (
    <div className={activeClasses} onClick={hideNotificationHandler}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

export default Notification;
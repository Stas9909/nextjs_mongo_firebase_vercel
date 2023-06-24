import HeaderNav from "./headerNav/HeaderNav"
import Notification from "../ui/Notification"
import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { hideNotification } from '@/Redux/notification/notificationActionCreator';

const MainLayout = ({ children }) => {
  const activeNotification = useSelector(state => state.notification.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <>
      <HeaderNav />
      <main>
        {children}
      </main>
      {activeNotification && <Notification
        title={activeNotification.title}
        message={activeNotification.message}
        status={activeNotification.status} />
      }
    </>
  )
}

export default MainLayout
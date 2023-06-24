// import { createContext, useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification } from '@/Redux/notification/notificationActionCreator';

// const NotificationContext = createContext({
//   notification: null, // { title, message, status }
//   showNotification: function (notificationData) { },// { title: notificationData.title, message: notificationData.message, status: notificationData.status }
//   hideNotification: function () { }
// })

export function NotificationContextProvider(props) {  //props = { children: <Component {...pageProps} /> }, который передается из _app.js в MainLayout в children и далее в NotificationContextProvider в props (в _app.js в <NotificationContextProvider>...</NotificationContextProvider>)
  const dispatch = useDispatch();
  const activeNotification = useSelector(
    (state) => state.notification.notification
  );

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        dispatch(hideNotification())
        // setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [activeNotification])

  function showNotificationHandler(notificationData) {
    // setActiveNotification(notificationData);
    dispatch(showNotification(notificationData))
  }

  function hideNotificationHandler() {
    // setActiveNotification(null);
    dispatch(hideNotification())
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider;

// export default NotificationContext;
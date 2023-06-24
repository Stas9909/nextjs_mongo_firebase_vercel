export const showNotification = (notificationData) => {
    return {
        type: 'SHOW_NOTIFICATION',
        payload: notificationData
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}
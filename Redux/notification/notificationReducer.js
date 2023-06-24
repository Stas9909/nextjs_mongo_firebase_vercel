let initialState = {
    notification: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                ...state,
                notification: action.payload
            }
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                notification: null
            }
        default:
            return state
    }
}

export default notificationReducer
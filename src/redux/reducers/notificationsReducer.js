import * as types from "../constants";

const initialState = {
  notifications: [],
  isChanged: true,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_NOTIFICATIONS_LIST:
      return {
        ...state,
        notifications: actions.notifications
      };
    case types.GET_FILTERED_NOTIFICATIONS_LIST:            
      // console.log('Reducer GetFilteredNotifications end: ', actions.notifications)

      return {
        ...state,
        notifications: actions.notifications,
        isChanged: false,
      };
    case types.EDIT_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications
          .filter(notification => notification.id !== actions.payload.id)
          .concat(actions.payload),
        isChanged: true
      };
    case types.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, actions.payload],
        isChanged: true
      };
    case types.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications
          .filter(notification => notification.id !== actions.id),
        isChanged: true
      };
    case types.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [], 
        isChanged: true,
      };
    default:
      return state;
  }
};

export default reducer;

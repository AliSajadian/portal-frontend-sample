import * as types from "../constants";

const initialState = {
  alert: [],
  isModalOpen: false,
  message: '',
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.OPEN_ALERT_MODAL:
      return {
        ...state,
        message: actions.message,
        isModalOpen: true
      };
    case types.TOGGLE_ALERT_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    default:
      return state;
  }
};

export default reducer;

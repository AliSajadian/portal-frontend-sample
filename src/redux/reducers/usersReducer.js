import * as types from "../constants";

const initialState = {
  users: [],
  userInfo: null,
  isModalOpen: false,
  userInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_USERS_LIST:
      return {
        ...state,
        users: actions.users
      };
    case types.LOAD_RELATED_USER_INFO_CARD:
      return {
        ...state,
        userInfo: actions.userInfo
      };
    case types.START_USER_MODAL:
      return {
        ...state,
        userInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_USER:
      return {
        ...state,
        users: state.users
          .filter(user => user.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };      
    case types.START_ADD_USER:
      return{
        ...state,
        userInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_USER:
      return {
        ...state,
        users: [...state.users, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_USER:
      return {
        ...state,
        users: state.users
          .filter(user => user.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_USER_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_USERS:
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
};

export default reducer;

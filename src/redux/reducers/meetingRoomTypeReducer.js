import * as types from "../constants";

const initialState = {
  roomTypes: [],
  roomTypeInfo: null,
  isModalOpen: false,
  roomTypeInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_ROOMTYPES_LIST:
      return {
        ...state,
        roomTypes: actions.roomTypes
      };
    case types.GET_REQUESTROOMTYPES_LIST:
      return {
        ...state,
        requestRoomTypes: actions.requestRoomTypes
      };
    case types.LOAD_RELATED_ROOMTYPE_INFO_CARD:
      return {
        ...state,
        roomTypeInfo: actions.roomTypeInfo
      };
    case types.START_ROOMTYPE_MODAL:
      return {
        ...state,
        roomTypeInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_ROOMTYPE:
      return {
        ...state,
        roomTypes: state.roomTypes
          .filter(roomType => roomType.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.EDIT_REQUESTROOMTYPE:
      let requestRoomType = state.requestRoomTypes.filter(requestRoomType => requestRoomType.id === actions.payload.id)
      requestRoomType.roomTypes = actions.payload.roomTypes
      return {
        ...state,
        requestRoomTypes: state.requestRoomTypes
          .filter(requestRoomType => requestRoomType.id !== actions.payload.id)
          .concat(requestRoomType),
      };
    case types.START_ADD_ROOMTYPE:
      return{
        ...state,
        // roomTypes: actions.roomTypes,
        roomTypeInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_ROOMTYPE:
      return {
        ...state,
        roomTypes: [...state.roomTypes, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_ROOMTYPE:
      return {
        ...state,
        roomTypes: state.roomTypes
          .filter(roomType => roomType.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_ROOMTYPE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_ROOMTYPES:
      return {
        ...state,
        roomTypes: []
      };
    default:
      return state;
  }
};

export default reducer;

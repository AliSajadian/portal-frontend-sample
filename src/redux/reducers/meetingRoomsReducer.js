import { type } from "jquery";
import * as types from "../constants";

const initialState = {
  rooms: [],
  roomEquipments: [],
  roomInfo: null,
  isModalOpen: false,
  roomInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_ROOMS_LIST:
      return {
        ...state,
        rooms: actions.rooms
      };
    case types.LOAD_RELATED_ROOM_INFO_CARD:
      return {
        ...state,
        roomInfo: actions.roomInfo
      };
    case types.GET_ROOMEQUIPMENTS_LIST:
      return {
        ...state,
        roomEquipments: actions.payload
      }
    case types.START_ROOM_MODAL:
      return {
        ...state,
        roomInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_ROOM:
      return {
        ...state,
        rooms: state.rooms
          .filter(room => room.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_ROOM:
      return{
        ...state,
        // rooms: actions.rooms,
        roomInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms
          .filter(room => room.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_ROOM_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_ROOMS:
      return {
        ...state,
        rooms: []
      };
    default:
      return state;
  }
};

export default reducer;

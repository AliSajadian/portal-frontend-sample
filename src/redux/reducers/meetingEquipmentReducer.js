import * as types from "../constants";

const initialState = {
  equipments: [],
  equipmentInfo: null,
  isModalOpen: false,
  equipmentInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_EQUIPMENTS_LIST:
      return {
        ...state,
        equipments: actions.equipments
      };
    case types.LOAD_RELATED_EQUIPMENT_INFO_CARD:
      return {
        ...state,
        equipmentInfo: actions.equipmentInfo
      };
    case types.START_EQUIPMENT_MODAL:
      return {
        ...state,
        equipmentInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments
          .filter(equipment => equipment.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_EQUIPMENT:
      return{
        ...state,
        // equipments: actions.equipments,
        equipmentInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_EQUIPMENT:
      return {
        ...state,
        equipments: [...state.equipments, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments
          .filter(equipment => equipment.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_EQUIPMENT_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_EQUIPMENTS:
      return {
        ...state,
        equipments: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  doctorTypes: [],
  doctorTypeInfo: null,
  isModalOpen: false,
  doctorTypeInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DOCTORTYPES_LIST:
      return {
        ...state,
        doctorTypes: actions.doctorTypes
      };
    case types.LOAD_RELATED_DOCTORTYPE_INFO_CARD:
      return {
        ...state,
        doctorTypeInfo: actions.doctorTypeInfo
      };
    case types.START_DOCTORTYPE_MODAL:
      return {
        ...state,
        doctorTypeInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_DOCTORTYPE:
      return {
        ...state,
        doctorTypes: state.doctorTypes
          .filter(doctorType => doctorType.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_DOCTORTYPE:
      return{
        ...state,
        // doctorTypes: actions.doctorTypes,
        doctorTypeInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_DOCTORTYPE:
      return {
        ...state,
        doctorTypes: [...state.doctorTypes, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DOCTORTYPE:
      return {
        ...state,
        doctorTypes: state.doctorTypes
          .filter(doctorType => doctorType.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_DOCTORTYPE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_DOCTORTYPES:
      return {
        ...state,
        doctorTypes: []
      };
    default:
      return state;
  }
};

export default reducer;

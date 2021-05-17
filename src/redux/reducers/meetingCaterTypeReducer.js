import * as types from "../constants";

const initialState = {
  caterTypes: [],
  caterTypeInfo: null,
  isModalOpen: false,
  caterTypeInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_CATERTYPES_LIST:
      return {
        ...state,
        caterTypes: actions.caterTypes
      };
    case types.LOAD_RELATED_CATERTYPE_INFO_CARD:
      return {
        ...state,
        caterTypeInfo: actions.caterTypeInfo
      };
    case types.START_CATERTYPE_MODAL:
      return {
        ...state,
        caterTypeInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_CATERTYPE:
      return {
        ...state,
        caterTypes: state.caterTypes
          .filter(caterType => caterType.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_CATERTYPE:
      return{
        ...state,
        // caterTypes: actions.caterTypes,
        caterTypeInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_CATERTYPE:
      return {
        ...state,
        caterTypes: [...state.caterTypes, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_CATERTYPE:
      return {
        ...state,
        caterTypes: state.caterTypes
          .filter(caterType => caterType.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_CATERTYPE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_CATERTYPES:
      return {
        ...state,
        caterTypes: []
      };
    default:
      return state;
  }
};

export default reducer;

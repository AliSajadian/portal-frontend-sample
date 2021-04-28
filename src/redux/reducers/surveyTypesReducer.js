import * as types from "../constants";

const initialState = {
  surveyTypes: [],
  surveyTypeInfo: null,
  isModalOpen: false,
  surveyTypeInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_SURVEYTYPES_LIST:
      return {
        ...state,
        surveyTypes: actions.surveyTypes
      };
    case types.LOAD_RELATED_SURVEYTYPE_INFO_CARD:
      return {
        ...state,
        surveyTypeInfo: actions.surveyTypeInfo
      };
    case types.START_SURVEYTYPE_MODAL:
      return {
        ...state,
        surveyTypeInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_SURVEYTYPE:
      return {
        ...state,
        surveyTypes: state.surveyTypes
          .filter(surveyType => surveyType.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_SURVEYTYPE:
      return{
        ...state,
        // surveyTypes: actions.surveyTypes,
        surveyTypeInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_SURVEYTYPE:
      return {
        ...state,
        surveyTypes: [...state.surveyTypes, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_SURVEYTYPE:
      return {
        ...state,
        surveyTypes: state.surveyTypes
          .filter(surveyType => surveyType.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_SURVEY_TYPE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_SURVEYTYPES:
      return {
        ...state,
        surveyTypes: []
      };
    default:
      return state;
  }
};

export default reducer;

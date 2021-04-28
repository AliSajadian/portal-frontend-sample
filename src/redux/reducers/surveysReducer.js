import * as types from "../constants";

const initialState = {
  surveys: [],
  surveyInfo: null,
  isModalOpen: false,
  surveyInEditStage: null,
  usedSurveys: [],
  unusedSurveys: []
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_SURVEYS_LIST:
      return {
        ...state,
        surveys: actions.surveys
      };
    case types.GET_USED_SURVEYS_LIST:
      // console.log('reducer usedSurveys: ', actions.usedSurveys)
      return {
        ...state,
        usedSurveys: actions.usedSurveys
      };
    case types.GET_UNUSED_SURVEYS_LIST: 
      return {
        ...state,
        unusedSurveys: actions.unusedSurveys
      };
    case types.LOAD_RELATED_SURVEY_INFO_CARD:
      return {
        ...state,
        surveyInfo: actions.surveyInfo
      };
    case types.START_SURVEY_MODAL:
      return {
        ...state,
        surveyInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_SURVEY:
      return {
        ...state,
        surveys: state.surveys
          .filter(survey => survey.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_SURVEY:
      return{
        ...state,
        surveyInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_SURVEY:
      return {
        ...state,
        surveys: [...state.surveys, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_SURVEY:
      return {
        ...state,
        surveys: state.surveys
          .filter(survey => survey.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_SURVEY_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_SURVEYS:
      return {
        ...state,
        surveys: []
      };
    default:
      return state;
  }
};

export default reducer;

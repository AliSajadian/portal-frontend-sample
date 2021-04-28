import * as types from "../constants";

const initialState = {
  surveyDepartments: [],
  surveyDepartmentInfo: null,
  isSurveyDepartmentModalOpen: false,
  surveyDepartmentInEditStage: null,
  surveyDepartment_surveryID: 0
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_SURVEYDEPARTMENTS_LIST:
      return {
        ...state,
        surveyDepartments: actions.payload
      };
    case types.LOAD_RELATED_SURVEYDEPARTMENT_INFO_CARD:
      return {
        ...state,
        surveyDepartmentInfo: actions.payload
      };
    case types.START_SURVEYDEPARTMENT_MODAL:
      return {
        ...state,
        surveyDepartmentInEditStage: actions.payload,
        isSurveyDepartmentModalOpen: true
      };
    case types.EDIT_SURVEYDEPARTMENT:
      return {
        ...state,
        surveyDepartments: state.surveyDepartments
          .filter(surveyDepartment => surveyDepartment.id !== actions.payload.id)
          .concat(actions.payload),
        isSurveyDepartmentModalOpen: false
      };
    case types.START_ADD_SURVEYDEPARTMENT:
      return{
        ...state,
        // surveyDepartments: actions.surveyDepartments,
        surveyDepartmentInEditStage: null,
        isSurveyDepartmentModalOpen: true,
        surveyDepartment_surveryID: actions.payload
      };
    case types.ADD_SURVEYDEPARTMENT:
      return {
        ...state,
        surveyDepartments: [...state.surveyDepartments, actions.payload],
        isSurveyDepartmentModalOpen: false
      };
    case types.REMOVE_SURVEYDEPARTMENT:
      return {
        ...state,
        surveyDepartments: state.surveyDepartments
          .filter(surveyDepartment => surveyDepartment.id !== actions.id),
        isSurveyDepartmentModalOpen: false
      };
    case types.TOGGLE_SURVEYDEPARTMENT_MODAL:
      return {
        ...state,
        isSurveyDepartmentModalOpen: !state.isSurveyDepartmentModalOpen
      };
    case types.CLEAR_SURVEYDEPARTMENTS:
      return {
        ...state,
        surveyDepartments: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  departments: [],
  departmentInfo: null,
  isModalOpen: false,
  departmentInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DEPARTMENTS_LIST:
      return {
        ...state,
        departments: actions.departments
      };
    case types.LOAD_RELATED_DEPARTMENT_INFO_CARD:
      return {
        ...state,
        departmentInfo: actions.departmentInfo
      };
    case types.START_DEPARTMENT_MODAL:
      return {
        ...state,
        departmentInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_DEPARTMENT:
      return {
        ...state,
        departments: state.departments
          .filter(department => department.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_DEPARTMENT:
      return{
        ...state,
        // departments: actions.departments,
        departmentInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DEPARTMENT:
      return {
        ...state,
        departments: state.departments
          .filter(department => department.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_DEPARTMENT_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_DEPARTMENTS:
      return {
        ...state,
        departments: []
      };
    default:
      return state;
  }
};

export default reducer;

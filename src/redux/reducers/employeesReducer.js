import * as types from "../constants";

const initialState = {
  employees: [],
  employeeCodes: [],
  employeeInfo: null,
  isModalOpen: false,
  employeeInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_EMPLOYEES_LIST:
      return {
        ...state,
        employees: actions.employees
      };
    case types.GET_EMPLOYEE_CODES_LIST:
      return {
        ...state,
        employeeCodes: actions.employeeCodes
      };      
    case types.LOAD_RELATED_EMPLOYEE_INFO_CARD:
      return {
        ...state,
        employeeInfo: actions.employeeInfo
      };
    case types.START_EMPLOYEE_MODAL:
      return {
        ...state,
        employeeInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_EMPLOYEE:
      return {
        ...state,
        employees: state.employees
          .filter(employee => employee.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_EMPLOYEE:
      return{
        ...state,
        // employees: actions.employees,
        employeeInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees
          .filter(employee => employee.id !== actions.id),
        isModalOpen: false
    };      
    case types.TOGGLE_EMPLOYEE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_EMPLOYEES:
      return {
        ...state,
        employees: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  companies: [],
  companyInfo: null,
  isModalOpen: false,
  companyInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_COMPANIES_LIST:
      return {
        ...state,
        companies: actions.companies
      };
    case types.LOAD_RELATED_COMPANY_INFO_CARD:
      return {
        ...state,
        companyInfo: actions.companyInfo
      };
    case types.START_COMPANY_MODAL:
      return {
        ...state,
        companyInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_COMPANY:
      return {
        ...state,
        companies: state.companies
          .filter(company => company.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_COMPANY:
      return{
        ...state,
        // companys: actions.companys,
        companyInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_COMPANY:
      return {
        ...state,
        companies: [...state.companies, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_COMPANY:
      return {
        ...state,
        companies: state.companies
          .filter(company => company.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_COMPANY_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_COMPANIES:
      return {
        ...state,
        companies: []
      };
    default:
      return state;
  }
};

export default reducer;

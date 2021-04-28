import * as types from "../constants";

const initialState = {
  projects: [],
  projectInfo: null,
  isModalOpen: false,
  projectInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_PROJECTS_LIST:
      return {
        ...state,
        projects: actions.projects
      };
    case types.LOAD_RELATED_PROJECT_INFO_CARD:
      return {
        ...state,
        projectInfo: actions.projectInfo
      };
    case types.START_PROJECT_MODAL:
      return {
        ...state,
        projectInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects
          .filter(project => project.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_PROJECT:
      return{
        ...state,
        // projects: actions.projects,
        projectInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects
          .filter(project => project.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_PROJECT_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_PROJECTS:
      return {
        ...state,
        projects: []
      };
    default:
      return state;
  }
};

export default reducer;

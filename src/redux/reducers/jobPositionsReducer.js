import * as types from "../constants";

const initialState = {
  jobPositions: [],
  jobPositionInfo: null,
  isModalOpen: false,
  jobPositionInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_JOBPOSITIONS_LIST:
      return {
        ...state,
        jobPositions: actions.jobPositions
      };
    case types.LOAD_RELATED_JOBPOSITION_INFO_CARD:
      return {
        ...state,
        jobPositionInfo: actions.jobPositionInfo
      };
    case types.START_JOBPOSITION_MODAL:
      return {
        ...state,
        jobPositionInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_JOBPOSITION:
      return {
        ...state,
        jobPositions: state.jobPositions
          .filter(jobPosition => jobPosition.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_JOBPOSITION:
      return{
        ...state,
        // jobPositions: actions.jobPositions,
        jobPositionInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_JOBPOSITION:
      return {
        ...state,
        jobPositions: [...state.jobPositions, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_JOBPOSITION:
      return {
        ...state,
        jobPositions: state.jobPositions
          .filter(jobPosition => jobPosition.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_JOBPOSITION_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_JOBPOSITIONS:
      return {
        ...state,
        jobPositions: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  requests: [],
  requestCaterTypes: [],
  dateRequests: [],
  requestInfo: null,
  isModalOpen: false,
  requestInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_REQUESTS_LIST:
      return {
        ...state,
        requests: actions.requests
      };
    case types.GET_DATEREQUESTS_LIST:
      return {
        ...state,
        dateRequests: actions.requests
      };
    case types.GET_DATEREQUESTCATERTYPES_LIST:
      return {
        ...state,
        requestCaterTypes: actions.payload
      }
    case types.LOAD_RELATED_REQUEST_INFO_CARD:
      return {
        ...state,
        requestInfo: actions.requestInfo
      };
    case types.START_REQUEST_MODAL:
      return {
        ...state,
        requestInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_REQUEST:
      return {
        ...state,
        requests: state.requests
          .filter(request => request.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_REQUEST:
      return{
        ...state,
        // requests: actions.requests,
        requestInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_REQUEST:
      return {
        ...state,
        requests: state.requests
          .filter(request => request.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_REQUEST_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_REQUESTS:
      return {
        ...state,
        requests: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  requests: [],
  dateRequests: [],
  requestInfo: null,

  requestEquipments: [],
  isreModalOpen: false,

  requestCaterTypes: [],
  isrctModalOpen: false,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_REQUESTS_LIST:
      return {
        ...state,
        requests: actions.payload
      };
    case types.GET_DATEREQUESTS_LIST:
      return {
        ...state,
        dateRequests: actions.payload
      };       
    case types.GET_REQUESTCATERTYPES_LIST:
      return {
        ...state,
        requestCaterTypes: actions.payload
      }
    case types.GET_REQUESTEQUIPMENTS_LIST:
      return {
        ...state,
        requestEquipments: actions.payload
      };      
    case types.LOAD_RELATED_REQUEST_INFO_CARD:
      return {
        ...state,
        requestInfo: actions.payload
      };
    case types.EDIT_REQUEST:
      return {
        ...state,
        requests: state.requests
          .filter(request => request.id !== actions.payload.id)
          .concat(actions.payload),
          isrctModalOpen: false,
          isreModalOpen: false
        };
    case types.START_ADD_REQUESTCATERTYPE:
      return{
        ...state,
        // requests: actions.requests,
        requestCaterTypeInEditStage: null,
        isrctModalOpen: true
      };
    case types.START_ADD_REQUESTEQUIPMENT:
      return{
        ...state,
        // requests: actions.requests,
        requestEquipmentInEditStage: null,
        isreModalOpen: true
      };        
    case types.START_REQUESTCATERTYPE_MODAL:
      return{
        ...state,
        requestCaterTypeInEditStage: actions.payload,
        isrctModalOpen: true     
      };      
    case types.START_REQUESTEQUIPMENT_MODAL:
      return{
        ...state,
        requestEquipmentInEditStage: actions.payload,
        isreModalOpen: true     
      };          
    case types.ADD_REQUEST:
      return {
        ...state,
        dateRequests: state.dateRequests
        .filter(request => request.id !== actions.payload.id)
        .concat(actions.payload),
        isrctModalOpen: false,
        isreModalOpen: false
      };
    case types.REMOVE_REQUEST:
      return {
        ...state,
        dateRequests: state.dateRequests
          .filter(request => request.id !== actions.id),
          isrctModalOpen: false,
          isreModalOpen: false
      };
    case types.TOGGLE_REQUESTCATERTYPE_MODAL:
      return {
        ...state,
        isrctModalOpen: !state.isrctModalOpen,
      };
    case types.TOGGLE_REQUESTEQUIPMENT_MODAL:
      return {
        ...state,
        isreModalOpen: !state.isreModalOpen,
      };
    case types.CLEAR_REQUESTS:
      return {
        ...state,
        dateRequests: []
      };
    default:
      return state;
  }
};

export default reducer;

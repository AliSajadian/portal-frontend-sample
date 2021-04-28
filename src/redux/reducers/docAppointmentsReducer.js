import * as types from "../constants";

const initialState = {
  docAppointments: [],
  docAppointmentTimes: [],
  docAppointmentInfo: null,
  isModalOpen: false,
  docAppointmentInEditStage: null,
  doctorID: 0,
  scheduleDayID: 0,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DOCAPPOINTMENTTIMES_LIST:
        return {
          ...state,
          docAppointmentTimes: actions.docAppointmentTimes 
        };
    case types.GET_DOCAPPOINTMENTS_LIST:
      return {
        ...state,
        docAppointments: actions.docAppointments 
      };
    case types.LOAD_RELATED_DOCAPPOINTMENT_INFO_CARD:
      return {
        ...state,
        docAppointmentInfo: actions.docAppointmentInfo
      };
    case types.START_DOCAPPOINTMENT_MODAL:
      return {
        ...state,
        docAppointmentInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.SET_DOCAPPOINTMENT_SCHEDULEDAYID:
      return {
        ...state,
        scheduleDayID: actions.payload,
      };
    case types.SET_DOCAPPOINTMENT_DOCTORID:
      return {
        ...state,
        doctorID: actions.payload,
      };      
    case types.EDIT_DOCAPPOINTMENT:
      return {
        ...state,
        docAppointments: state.docAppointments
          .filter(docAppointment => docAppointment.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_DOCAPPOINTMENT:
      return{
        ...state,
        // companys: actions.companys,
        docAppointmentInEditStage: null,
        isModalOpen: true
      };      
    case types.ADD_DOCAPPOINTMENT:
      return {
        ...state,
        docAppointments: [...state.docAppointments, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DOCAPPOINTMENT:
      return {
        ...state,
        docAppointments: state.docAppointments
          .filter(docAppointment => docAppointment.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_DOCAPPOINTMENT_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_DOCAPPOINTMENTS:
      return {
        ...state,
        docAppointments: []
      };
    default:
      return state;
  }
};

export default reducer;

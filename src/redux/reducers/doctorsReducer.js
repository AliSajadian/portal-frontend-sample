import * as types from "../constants";

const initialState = {
  doctors: [],
  doctorInfo: null,
  isModalOpen: false,
  doctorInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DOCTORS_LIST:
      return {
        ...state,
        doctors: actions.doctors
      };
    case types.LOAD_RELATED_DOCTOR_INFO_CARD:
      return {
        ...state,
        doctorInfo: actions.doctorInfo
      };
    case types.START_DOCTOR_MODAL:
      return {
        ...state,
        doctorInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_DOCTOR:
      return {
        ...state,
        doctors: state.doctors
          .filter(doctor => doctor.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_DOCTOR:
      return{
        ...state,
        // doctors: actions.doctors,
        doctorInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors
          .filter(doctor => doctor.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_DOCTOR_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_DOCTORS:
      return {
        ...state,
        doctors: []
      };
    default:
      return state;
  }
};

export default reducer;

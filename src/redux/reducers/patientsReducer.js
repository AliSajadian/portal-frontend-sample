import * as types from "../constants";

const initialState = {
  patientsFiles: [],
  patientFilesInfo: null,
  isModalOpen: false,
  patientInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_PATIENTSFILES_LIST:
      return {
        ...state,
        patientsFiles: actions.payload 
      };
    case types.LOAD_RELATED_PATIENTFILE_INFO_CARD:
      return {
        ...state,
        patientFilesInfo: actions.payload
      };
    case types.EDIT_PATIENTFILE:
      return {
        ...state,
        patientsFiles: state.patientsFiles
          .filter(patientFile => patientFile.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.ADD_PATIENTFILE:
      return {
        ...state,
        patientsFiles: [...state.patientsFiles, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_PATIENTFILE:
      return {
        ...state,
        patientsFiles: state.patientsFiles
          .filter(patientFile => patientFile.id !== actions.id),
        isModalOpen: false
      };

    case types.CLEAR_PATIENTSFILES:
      return {
        ...state,
        patientsFiles: []
      };
    default:
      return state;
  }
};

export default reducer;

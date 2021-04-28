import * as types from "../constants";

const initialState = {
  docScheduleDays: [],
  docScheduleDayInfo: null,
  isModalOpen: false,
  docScheduleDayInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DOCSCHEDULEDAYS_LIST:
      return {
        ...state,
        docScheduleDays: actions.docScheduleDays 
      };
    case types.LOAD_RELATED_DOCSCHEDULEDAY_INFO_CARD:
      return {
        ...state,
        docScheduleDayInfo: actions.docScheduleDayInfo
      };
    case types.EDIT_DOCSCHEDULEDAY:
      return {
        ...state,
        docScheduleDays: state.docScheduleDays
          .filter(docScheduleDay => docScheduleDay.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.ADD_DOCSCHEDULEDAY:
      return {
        ...state,
        docScheduleDays: [...state.docScheduleDays, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DOCSCHEDULEDAY:
      return {
        ...state,
        docScheduleDays: state.docScheduleDays
          .filter(docScheduleDay => docScheduleDay.id !== actions.id),
        isModalOpen: false
      };

    case types.CLEAR_DOCSCHEDULEDAYS:
      return {
        ...state,
        docScheduleDays: []
      };
    default:
      return state;
  }
};

export default reducer;

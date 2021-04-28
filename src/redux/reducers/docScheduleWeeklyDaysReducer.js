import * as types from "../constants";

const initialState = {
  docScheduleWeeklyDays: [],
  docScheduleWeeklyDayInfo: null,
  isModalOpen: false,
  docScheduleWeeklyDayInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_DOCSCHEDULEWEEKLYDAYS_LIST:
      return {
        ...state,
        docScheduleWeeklyDays: actions.docScheduleWeeklyDays 
      };
    case types.LOAD_RELATED_DOCSCHEDULEWEEKLYDAY_INFO_CARD:
      return {
        ...state,
        docScheduleWeeklyDayInfo: actions.docScheduleWeeklyDayInfo
      };
    case types.EDIT_DOCSCHEDULEWEEKLYDAY:
      return {
        ...state,
        docScheduleWeeklyDays: state.docScheduleWeeklyDays
          .filter(docScheduleWeeklyDay => docScheduleWeeklyDay.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.ADD_DOCSCHEDULEWEEKLYDAY:
      return {
        ...state,
        docScheduleWeeklyDays: [...state.docScheduleWeeklyDays, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_DOCSCHEDULEWEEKLYDAY:
      return {
        ...state,
        docScheduleWeeklyDays: state.docScheduleWeeklyDays
          .filter(docScheduleWeeklyDay => docScheduleWeeklyDay.id !== actions.id),
        isModalOpen: false
      };

    case types.CLEAR_DOCSCHEDULEWEEKLYDAYS:
      return {
        ...state,
        docScheduleWeeklyDays: []
      };
    default:
      return state;
  }
};

export default reducer;

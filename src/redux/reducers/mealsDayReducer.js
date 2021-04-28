import * as types from "../constants";

const initialState = {
  mealsDays: [],
  MealsDay: [],
  mealDayInfo: null,
  mealDayInEditStage: null,
  currentMonthDates: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_MEALDAYS_LIST:
      return {
        ...state,
        mealsDays: actions.mealsDays
      };
    case types.GET_MEALSDAY_LIST:
      return {
        ...state,
        MealsDay: actions.MealsDay
      };      
    case types.GET_CURRENTMONTHDATES:
      return {
        currentMonthDates: actions.payload
      };
    case types.LOAD_RELATED_MEALDAY_INFO_CARD:
      return {
        ...state,
        mealDayInfo: actions.mealDayInfo
      };
    case types.ADD_MEALDAY:
      return {
        ...state,
        mealsDays: [...state.mealsDays, actions.payload],
      };
    case types.EDIT_MEALDAY:
      return {
        ...state,
        mealsDays: state.mealsDays
                  .filter(mealsDay => mealsDay.id !== actions.payload.id)
                  .concat(actions.payload)
      }
    case types.EDIT_GUESTMEALDAYJUNCTION:
      return {
        ...state,
        MealsDay: actions.MealsDay
      };          
    case types.REMOVE_MEALDAY:
      return {
        ...state,
        mealsDays: state.mealsDays
          .filter(mealDay => mealDay.id !== actions.id),
      };
    case types.CLEAR_MEALDAYS:
      return {
        ...state,
        mealsDays: []
      };
    default:
      return state;
  }
};

export default reducer;

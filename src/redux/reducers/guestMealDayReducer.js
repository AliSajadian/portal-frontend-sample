import * as types from "../constants";

const initialState = {
  guestMealDay: [],
  guestMealsDays: [],
  servedMeals: [],
  guestMealsDay: [],
  guestMealDayInfo: null,
  isModalOpen: false,
  guestMealDayInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_GUESTMEALONEDAYS_LIST:
      return {
        ...state,
        guestMealsDays: actions.payload
      };    
    case types.GET_GUESTMEALDAYSEx_LIST:
      return {
        ...state,
        guestMealsDays: actions.payload
      };
    case types.GET_GUESTMEALSDAY_LIST: 
      return {
        ...state,
        guestMealsDay: actions.payload
      };
    case types.GET_SERVEDMEALS_LIST:
      return {
        ...state,
        servedMeals: actions.payload
      };      
    case types.LOAD_RELATED_GUESTMEALDAY_INFO_CARD:
      return {
        ...state,
        guestMealDayInfo: actions.guestMealDayInfo
      };
    case types.START_GUESTMEALDAY_MODAL:
      return {
        ...state,
        guestMealDayInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_GUESTMEALDAY: 
      return {
        ...state,
        guestMealDay: state.guestMealDay
          .filter(guestMealDay => guestMealDay.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_GUESTMEALDAY:
      return{
        ...state,
        // guestMealDay: actions.guestMealDay,
        guestMealDayInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_GUESTMEALDAY:
      return {
        ...state,
        guestMealDay: [...state.guestMealDay, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_GUESTMEALDAY:
      return {
        ...state,
        guestMealDay: state.guestMealDay
          .filter(guestMealDay => guestMealDay.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_GUESTMEALDAY_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_GUESTMEALDAYS:
      return {
        ...state,
        guestMealDay: []
      };
    default:
      return state;
  }
};

export default reducer;

import * as types from "../constants";

const initialState = {
  personelMealDay: [],
  personelMealDays: [],
  servedMeals: [],
  personelMealDayInfo: null,
  isModalOpen: false,
  personelMealDayInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_PERSONELMEALONEDAYS_LIST:
      return {
        ...state,
        personelMealDays: actions.payload
      };    
    case types.GET_PERSONELMEALDAYSEx_LIST:
      return {
        ...state,
        personelMealDays: actions.payload
      };
    case types.GET_PERSONELMEALDAYS_LIST:
      return {
        ...state,
        personelMealDay: actions.personelMealDay
      };
    case types.GET_SERVEDMEALS_LIST:
      return {
        ...state,
        servedMeals: actions.payload
      };      
    case types.LOAD_RELATED_PERSONELMEALDAY_INFO_CARD:
      return {
        ...state,
        personelMealDayInfo: actions.personelMealDayInfo
      };
    case types.START_PERSONELMEALDAY_MODAL:
      return {
        ...state,
        personelMealDayInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: state.personelMealDay
          .filter(personelMealDay => personelMealDay.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_PERSONELMEALDAY:
      return{
        ...state,
        // personelMealDay: actions.personelMealDay,
        personelMealDayInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: [...state.personelMealDay, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_PERSONELMEALDAY:
      return {
        ...state,
        personelMealDay: state.personelMealDay
          .filter(personelMealDay => personelMealDay.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_PERSONELMEALDAY_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_PERSONELMEALDAYS:
      return {
        ...state,
        personelMealDay: []
      };
    default:
      return state;
  }
};

export default reducer;

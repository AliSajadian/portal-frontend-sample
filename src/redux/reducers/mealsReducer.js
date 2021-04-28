import * as types from "../constants";

const initialState = {
  meals: [],
  mealInfo: null,
  isModalOpen: false,
  mealInEditStage: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_MEALS_LIST:
      return {
        ...state,
        meals: actions.meals
      };
    case types.LOAD_RELATED_MEAL_INFO_CARD:
      return {
        ...state,
        mealInfo: actions.mealInfo
      };
    case types.START_MEAL_MODAL:
      return {
        ...state,
        mealInEditStage: actions.payload,
        isModalOpen: true
      };
    case types.EDIT_MEAL:
      return {
        ...state,
        meals: state.meals
          .filter(meal => meal.id !== actions.payload.id)
          .concat(actions.payload),
        isModalOpen: false
      };
    case types.START_ADD_MEAL:
      return{
        ...state,
        // meals: actions.meals,
        mealInEditStage: null,
        isModalOpen: true
      };
    case types.ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, actions.payload],
        isModalOpen: false
      };
    case types.REMOVE_MEAL:
      return {
        ...state,
        meals: state.meals
          .filter(meal => meal.id !== actions.id),
        isModalOpen: false
      };
    case types.TOGGLE_MEAL_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case types.CLEAR_MEALS:
      return {
        ...state,
        meals: []
      };
    default:
      return state;
  }
};

export default reducer;

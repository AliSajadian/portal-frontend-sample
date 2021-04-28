import * as types from "../constants";

const initialState = {
  optionalQuestions: [],
  optionalQuestion: null,
  optionalQuestionInEditStage: null,
  optionalQuestionsAnswer: [],
  optionalQuestionAnswer: null,
  optionalQuestionAnswerInEditStage: null,
  userAnswers: null
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_USERANSWERS_LIST:
      return {
        ...state,
        userAnswers: actions.payload
      };
    case types.GET_USERANSWER:
      return {
        ...state,
        userAnswers: actions.payload
      };
    case types.ADD_USERANSWERS: 
      return {
        ...state,
        userAnswers: [...state.userAnswers, actions.payload],
      };
    case types.CLEAR_USERANSWERS:
      return {
        ...state,
        userAnswers: []
      };

    default:
      return state;
  }
};

export default reducer;

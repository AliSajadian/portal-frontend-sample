import * as types from "../constants";

const initialState = {
  optionalQuestions: [],
  optionalQuestion: null,
  optionalQuestionInEditStage: null,
  optionalQuestionsAnswer: [],
  optionalQuestionAnswer: null,
  optionalQuestionAnswerInEditStage: null,
  surveyReport: []
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case types.GET_OPTIONALQUESTIONS_LIST:
      return {
        ...state,
        optionalQuestions: actions.payload
      };
    case types.GET_OPTIONALQUESTION:
      return {
        ...state,
        optionalQuestion: actions.payload
      };
    case types.EDIT_OPTIONALQUESTION:
      const questions = state.optionalQuestions
      // .filter(optionalQuestion => optionalQuestion.id !== actions.payload.id)
      // .concat(actions.payload)
      questions.map(q => (q.id === actions.payload.id) ?
      (
        q.question = actions.payload.question,
        q.questionType = actions.payload.questionType,
        q.isRequired = actions.payload.isRequired
      ) : "")
      return {
        ...state,
        optionalQuestions: questions
      };
    case types.ADD_OPTIONALQUESTION:
      return {
        ...state,
        optionalQuestions: [...state.optionalQuestions, actions.payload],
      };
    case types.REMOVE_OPTIONALQUESTION:
      return {
        ...state,
        optionalQuestions: state.optionalQuestions
          .filter(optionalQuestion => optionalQuestion.id !== actions.id),
      };
    case types.CLEAR_OPTIONALQUESTIONS:
      return {
        ...state,
        optionalQuestions: []
      };

    ////////////////////////////////////////////
    case types.GET_OPTIONALQUESTIONSANSWER_LIST:
      return {
          ...state,
          optionalQuestionsAnswer: actions.payload
      };
    case types.GET_OPTIONALQUESTIONANSWER:
      return {
          ...state,
          optionalQuestionAnswer: actions.payload
      };
    case types.EDIT_OPTIONALQUESTIONANSWER:
      const answers = state.optionalQuestionsAnswer
      // state.optionalQuestionsAnswer
      //           .filter(optionalQuestionAnswer => optionalQuestionAnswer.id !== actions.payload.id)
      //           .concat(actions.payload),
      answers.map(a => (a.id === actions.payload.id) ?
      (
        a.answer = actions.payload.answer
      ) : "")
      return {
          ...state,
          optionalQuestionsAnswer: answers
      };
    case types.ADD_OPTIONALQUESTIONANSWER:
      return {
          ...state,
          optionalQuestionsAnswer: [...state.optionalQuestionsAnswer, actions.payload],
      };
    case types.REMOVE_OPTIONALQUESTIONANSWER:
      return {
          ...state,
          optionalQuestionsAnswer: state.optionalQuestionsAnswer
          .filter(optionalQuestionAnswer => optionalQuestionAnswer.id !== actions.id),
      };
    case types.CLEAR_OPTIONALQUESTIONSANSWER:
      return {
          ...state,
          optionalQuestionsAnswer: []
      };      
    ////////////////////////////////////////////
    case types.EDIT_SURVEYREPORT:
      const report = state.surveyReport
      // state.optionalQuestionsAnswer
      //           .filter(optionalQuestionAnswer => optionalQuestionAnswer.id !== actions.payload.id)
      //           .concat(actions.payload),
      report.map(r => (r.id === actions.payload.id) ?
      (
        r.a1 = actions.payload.a1,
        r.a2 = actions.payload.a2,
        r.a3 = actions.payload.a3,
        r.a4 = actions.payload.a4,
        r.a5 = actions.payload.a5,
        r.a6 = actions.payload.a6,
        r.a7 = actions.payload.a7,
        r.a8 = actions.payload.a8
      ) : "")
      return {
          ...state,
          surveyReport: report
      };
    case types.ADD_SURVEYREPORT:
      return {
          ...state,
          surveyReport: [...state.surveyReport, actions.payload],
      };
    case types.REMOVE_SURVEYREPORT:
      return {
          ...state,
          surveyReport: state.surveyReport
          .filter(surveyReport => surveyReport.id !== actions.id),
      };

    default:
      return state;
  }
};

export default reducer;

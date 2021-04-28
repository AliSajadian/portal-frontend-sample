import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";

// ADD OPTIONALQUESTION
export const AddUserAnswer = userAnswer => { 
  return dispatch => {
    axios
      .post("http://172.20.20.45:90/api/userAnswers/", userAnswer)
      .then(res => {
        dispatch({
          type: types.ADD_USERANSWERS,
          payload: res.data
        });
        //toastr.success("Optional Question add succesfuly")
      })
      .catch(error => {
        console.log(error);
      });
  };
};

// GET OPTIONALQUESTIONS
export const GetUserAnswers = () => {
  return dispatch => {
    axios
      .get("http://172.20.20.45:90/api/userAnswers/")
      .then(res => {
        dispatch({
          type: types.GET_USERANSWERS_LIST,
          payload: res.data
        });
      })
      .catch(() => {
        toastr.error("Fail!");
      });
  };
};

// GET OPTIONALQUESTION
export const GetUserAnswer = id => {
  return dispatch => {
    axios
      .get(`http://172.20.20.45:90/api/optionalQuestions/${id}`)
      .then(res => {
        dispatch({
          type: types.GET_OPTIONALQUESTION,
          payload: res.data
        });
      })
      .catch(() => {
        toastr.error("Fail!");
      });
  };
};

// // EDIT OPTIONALQUESTION
// export const EditOptionalQuestion = optionalQuestion => {
//     return dispatch => {
//         axios.put(`http://172.20.20.45:90/api/optionalQuestions/${optionalQuestion.id}/`, optionalQuestion)
//             .then(res => {
//                 dispatch({
//                 type: types.EDIT_OPTIONALQUESTION,
//                 payload: res.data
//                 });
//                 //toastr.success("Optional Question Edit succesfuly")
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }
// };

// GET OPTIONALQUESTIONANSWERS
export const GetOptionalQuestionsAnswer = () => {
  return dispatch => {
    axios
      .get("http://172.20.20.45:90/api/optionalAnswers/")
      .then(res => {
        dispatch({
          type: types.GET_OPTIONALQUESTIONSANSWER_LIST,
          payload: res.data
        });
      })
      .catch(() => {
        toastr.error("Fail!");
      });
  };
};

// GET OPTIONALQUESTIONANSWER
export const GetOptionalQuestionAnswer = id => {
  return dispatch => {
    axios
      .get(`http://172.20.20.45:90/api/optionalAnswers/${id}`)
      .then(res => {
        dispatch({
          type: types.GET_OPTIONALQUESTIONANSWER,
          payload: res.data
        });
      })
      .catch(() => {
        toastr.error("Fail!");
      });
  };
};

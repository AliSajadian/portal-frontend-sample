import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



// ADD OPTIONALQUESTION
export const AddOptionalQuestion = optionalQuestion => {
    return dispatch => {	
        axios.post("http://portalapi.asft.co/api/Questions/", optionalQuestion)
            .then(res => {
                dispatch({
                type: types.ADD_OPTIONALQUESTION,
                payload: res.data
                });
                //toastr.success("Optional Question add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// GET OPTIONALQUESTIONS
export const GetOptionalQuestions = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/Questions/')
        .then((res) => {
            dispatch({
                type : types.GET_OPTIONALQUESTIONS_LIST , 
                payload : res.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

// GET OPTIONALQUESTION
export const GetOptionalQuestion = (id) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/Questions/${id}`)
        .then((res) => {
            dispatch({
                type : types.GET_OPTIONALQUESTION , 
                payload : res.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

// EDIT OPTIONALQUESTION
export const EditOptionalQuestion = optionalQuestion => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/Questions/${optionalQuestion.id}/`, optionalQuestion)
            .then(res => {
                dispatch({
                type: types.EDIT_OPTIONALQUESTION,
                payload: res.data
                });
                //toastr.success("Optional Question Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// REMOVE OPTIONALQUESTION
export const RemoveOptionalQuestion = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/Questions/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_OPTIONALQUESTION ,
                    id: id
                })
                toastr.success("Optional Question removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}
/////////////////////////////////////////////////////////////////////
// ADD OPTIONALQUESTIONANSWER
export const AddOptionalQuestionAnswer = optionalAnswer => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/Answers/", optionalAnswer)
            .then(res => {
                dispatch({
                type: types.ADD_OPTIONALQUESTIONANSWER,
                payload: res.data
                });
                //toastr.success("Optional Question Answer add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// GET OPTIONALQUESTIONANSWERS
export const GetOptionalQuestionsAnswer = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/Answers/')
        .then((res) => {
            dispatch({
                type : types.GET_OPTIONALQUESTIONSANSWER_LIST , 
                payload : res.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

// GET OPTIONALQUESTIONANSWER
export const GetOptionalQuestionAnswer = (id) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/Answers/${id}`)
        .then((res) => {
            dispatch({
                type : types.GET_OPTIONALQUESTIONANSWER , 
                payload : res.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

// EDIT OPTIONALQUESTIONANSWER
export const EditOptionalQuestionAnswer = optionalAnswer => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/Answers/${optionalAnswer.id}/`, optionalAnswer)
            .then(res => {
                dispatch({
                type: types.EDIT_OPTIONALQUESTIONANSWER,
                payload: res.data
                });
                //toastr.success("Optional Question Answer Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// REMOVE OPTIONALQUESTIONANSWER
export const RemoveOptionalQuestionAnswer = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/Answers/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_OPTIONALQUESTIONANSWER ,
                    id: id
                })
                toastr.success("Optional Question Answer removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}
/////////////////////////////////////////////////////////////////////
// ADD SurveyReport
export const AddSurveyReport = surveyReport => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/surveyReports/", surveyReport)
            .then(res => {
                dispatch({
                type: types.ADD_SURVEYREPORT,
                payload: res.data
                });
                //toastr.success("Optional Question Answer add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// EDIT SurveyReport
export const EditSurveyReport = surveyReport => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/SurveyReports/${surveyReport.id}/`, surveyReport)
            .then(res => {
                dispatch({
                type: types.EDIT_SURVEYREPORT,
                payload: res.data
                });
                //toastr.success("Optional Question Answer Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// REMOVE SurveyReport
export const RemoveSurveyReport = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/SurveyReports/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_SURVEYREPORT ,
                    id: id
                })
                toastr.success("Optional Question Answer removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}



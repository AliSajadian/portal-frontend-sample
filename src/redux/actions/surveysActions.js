
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetSurveysList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/surveys/')
        .then((response) => {
            dispatch({
                type : types.GET_SURVEYS_LIST , 
                surveys : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetUsedSurveysList = (userID) => {     
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/usedsurveys/${userID}`)
        .then((response) => {
            dispatch({
                type : types.GET_USED_SURVEYS_LIST , 
                usedSurveys : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const GetUnusedSurveysList = (userID) => { 
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/unusedsurveys/${userID}`)
        .then((response) => {
            dispatch({
                type : types.GET_UNUSED_SURVEYS_LIST , 
                unusedSurveys : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedSurveyInfoCard = (surveyId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/surveys/${surveyId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_SURVEY_INFO_CARD , 
                surveyInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveSurvey = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/surveys/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_SURVEY ,
                    id: id
                })
                toastr.success("Survey Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddSurveyModal = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/surveys/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_SURVEY , 
    //             surveys : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_SURVEY
    }
}

// ADD SURVEY
export const AddSurvey = survey => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/surveys/", survey)
            .then(res => {
                dispatch({
                type: types.ADD_SURVEY,
                payload: res.data
                });
                toastr.success("Survey add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET SURVEY MODAL
 export const GetSurveysModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/surveys/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_SURVEY_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT SURVEY
export const EditSurvey = survey => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/surveys/${survey.id}/`, survey)
            .then(resonse => {
                dispatch({
                type: types.EDIT_SURVEY,
                payload: resonse.data
                });
                toastr.success("Survey Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const SurveyModalToggler = () => {
    return {
        type: types.TOGGLE_SURVEY_MODAL
    }
}



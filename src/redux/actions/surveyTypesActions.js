
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetSurveyTypesList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/surveyTypes/')
        .then((response) => {
            dispatch({
                type : types.GET_SURVEYTYPES_LIST , 
                surveyTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedSurveyTypeInfoCard = (surveyTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/surveyTypes/${surveyTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_SURVEYTYPE_INFO_CARD , 
                surveyTypeInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveSurveyType = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/surveyTypes/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_SURVEYTYPE ,
                    id: id
                })
                toastr.success("Survey Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddSurveyTypeModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/surveyTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_SURVEYTYPE , 
    //             surveyTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_SURVEYTYPE
    }
}

// ADD SURVEYTYPE
export const AddSurveyType = surveyType => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/surveyTypes/", surveyType)
            .then(res => {
                dispatch({
                type: types.ADD_SURVEYTYPE,
                payload: res.data
                });
                toastr.success("Survey Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET SURVEYTYPE MODAL
 export const GetSurveyTypesModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/surveyTypes/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_SURVEYTYPE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT SURVEYTYPE
export const EditSurveyType = surveyType => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/surveyTypes/${surveyType.id}/`, surveyType)
            .then(resonse => {
                dispatch({
                type: types.EDIT_SURVEYTYPE,
                payload: resonse.data
                });
                toastr.success("Survey Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const SurveyTypeModalToggler = () => {
    return {
        type: types.TOGGLE_SURVEY_TYPE_MODAL
    }
}



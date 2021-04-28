
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetSurveyDepartmentsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/surveydepartment/')
        .then((response) => {
            dispatch({
                type : types.GET_SURVEYDEPARTMENTS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedSurveyDepartmentInfoCard = (id) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/surveydepartment/${id}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_SURVEYDEPARTMENT_INFO_CARD , 
                payload : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveSurveyDepartment = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/surveydepartment/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_SURVEYDEPARTMENT ,
                    id: id
                })
                toastr.success("SurveyDepartment Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddSurveyDepartmentModal = (surveyID) => {
    // return dispatch => {
    //     axios.get('http://172.20.20.45:90/api/surveydepartment/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_SURVEYDEPARTMENT , 
    //             surveydepartment : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_SURVEYDEPARTMENT,
        payload: surveyID
    }
}

// ADD SURVEYDEPARTMENT
export const AddSurveyDepartment = surveyDepartment => {
    return dispatch => {
        axios.post("http://172.20.20.45:90/api/surveydepartment/", surveyDepartment)
            .then(res => {
                dispatch({
                type: types.ADD_SURVEYDEPARTMENT,
                payload: res.data
                });
                toastr.success("SurveyDepartment Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET SURVEYDEPARTMENT MODAL
 export const GetSurveyDepartmentsModal = (id) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/surveydepartment/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_SURVEYDEPARTMENT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT SURVEYDEPARTMENT
export const EditSurveyDepartment = surveyDepartment => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/surveydepartment/${surveyDepartment.id}/`, surveyDepartment)
            .then(resonse => {
                dispatch({
                type: types.EDIT_SURVEYDEPARTMENT,
                payload: resonse.data
                });
                toastr.success("SurveyDepartment Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const SurveyDepartmentModalToggler = () => {
    return {
        type: types.TOGGLE_SURVEYDEPARTMENT_MODAL
    }
}



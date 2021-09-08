
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetJobPositionsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/jobPositions/')
        .then((response) => {
            dispatch({
                type : types.GET_JOBPOSITIONS_LIST , 
                jobPositions : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedJobPositionInfoCard = (jobPositionId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/jobPositions/${jobPositionId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_JOBPOSITION_INFO_CARD , 
                jobPositionInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveJobPosition = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/jobPositions/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_JOBPOSITION ,
                    id: id
                })
                toastr.success("JobPosition Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddJobPositionModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/jobPositions/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_JOBPOSITION , 
    //             jobPositions : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_JOBPOSITION
    }

}

// ADD JobPosition
export const AddJobPosition = jobPosition => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/jobPositions/", jobPosition)
            .then(res => {
                dispatch({
                type: types.ADD_JOBPOSITION,
                payload: res.data
                });
                toastr.success("JobPosition Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET JobPosition MODAL
 export const GetJobPositionsModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/jobPositions/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_JOBPOSITION_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT JobPosition
export const EditJobPosition = jobPosition => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/jobPositions/${jobPosition.id}/`, jobPosition)
            .then(resonse => {
                dispatch({
                type: types.EDIT_JOBPOSITION,
                payload: resonse.data
                });
                toastr.success("JobPosition Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const JobPositionModalToggler = () => {
    return {
        type: types.TOGGLE_JOBPOSITION_MODAL
    }
}



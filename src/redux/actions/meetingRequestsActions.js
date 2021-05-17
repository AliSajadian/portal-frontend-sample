
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetRequestsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/requests/')
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTS_LIST , 
                requests : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedRequestInfoCard = (requestId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/requests/${requestId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_REQUEST_INFO_CARD , 
                requestInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveRequest = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/requests/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_REQUEST ,
                    id: id
                })
                toastr.success("Request Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRequestModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/requests/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_REQUEST , 
    //             requests : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_REQUEST
    }

}

// ADD Request
export const AddRequest = request => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/requests/", request)
            .then(res => {
                dispatch({
                type: types.ADD_REQUEST,
                payload: res.data
                });
                toastr.success("Request Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Request MODAL
 export const GetRequestsModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/requests/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_REQUEST_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Request
export const EditRequest = request => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/requests/${request.id}/`, request)
            .then(resonse => {
                dispatch({
                type: types.EDIT_REQUEST,
                payload: resonse.data
                });
                toastr.success("Request Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const RequestModalToggler = () => {
    return {
        type: types.TOGGLE_REQUEST_MODAL
    }
}



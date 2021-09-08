

import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetRequestCaterTypesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/requestcatertypes/')
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTCATERTYPES_LIST , 
                requestCaterTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDateRequestCaterTypesList = (date) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/requestcatertypes/${date}`)
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTCATERTYPES_LIST , 
                requestCaterTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedRequestCaterTypeInfoCard = (caterTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/cater-types/${caterTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_REQUESTCATERTYPE_INFO_CARD , 
                requestCaterTypeInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveRequestCaterType = (id) => {
    let url = `http://portalapi.asft.co/api/requestcatertypes/${id}`
    return dispatch => {    
        axios.delete(url)
            .then(() => {
                dispatch({
                    type: types.REMOVE_REQUESTCATERTYPE,
                    id: id
                })
                toastr.success("Request Cater Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRequestCaterTypeModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/caterTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_REQUESTCATERTYPE , 
    //             caterTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_REQUESTCATERTYPE
    }

}

// ADD RequestCaterType
export const AddRequestCaterType = requestCaterType => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/requestcatertypes/", requestCaterType)
            .then(res => {
                dispatch({
                type: types.ADD_REQUESTCATERTYPE,
                payload: res.data
                });
                // toastr.success("RequestCaterType add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET RequestCaterType MODAL
 export const GetRequestCaterTypesModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/requestcatertypes/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_REQUESTCATERTYPE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT RequestCaterType
export const EditRequestCaterType = requestCaterType => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/requestcatertypes/${requestCaterType.id}/`, requestCaterType)
            .then(resonse => {
                dispatch({
                type: types.EDIT_REQUESTCATERTYPE,
                payload: resonse.data
                });
                // toastr.success("RequestCaterType Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const RequestCaterTypeModalToggler = () => {
    return {
        type: types.TOGGLE_REQUESTCATERTYPE_MODAL
    }
}



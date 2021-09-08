

import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetCaterTypesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/catertypes/')
        .then((response) => {
            dispatch({
                type : types.GET_CATERTYPES_LIST , 
                caterTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetRequestCaterTypesList = (date) => {
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

export const LoadRelatedCaterTypeInfoCard = (caterTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/cater-types/${caterTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_CATERTYPE_INFO_CARD , 
                caterTypeInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveCaterType = (id) => {
    let url = `http://portalapi.asft.co/api/catertypes/${id}`
    return dispatch => {    
        axios.delete(url)
            .then(() => {
                dispatch({
                    type: types.REMOVE_CATERTYPE,
                    id: id
                })
                toastr.success("Cater Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddCaterTypeModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/caterTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_CATERTYPE , 
    //             caterTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_CATERTYPE
    }

}

// ADD CaterType
export const AddCaterType = caterType => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/catertypes/", caterType)
            .then(res => {
                dispatch({
                type: types.ADD_CATERTYPE,
                payload: res.data
                });
                // toastr.success("CaterType add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET CaterType MODAL
 export const GetCaterTypesModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/catertypes/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_CATERTYPE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT CaterType
export const EditCaterType = caterType => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/catertypes/${caterType.id}/`, caterType)
            .then(resonse => {
                dispatch({
                type: types.EDIT_CATERTYPE,
                payload: resonse.data
                });
                // toastr.success("CaterType Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const EditRequestCaterType = requestCaterType => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/auth/requestcatertypes/${requestCaterType.id}`, requestCaterType)
        .then((response) => {
            dispatch({
                type : types.EDIT_REQUESTCATERTYPE, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const CaterTypeModalToggler = () => {
    return {
        type: types.TOGGLE_CATERTYPE_MODAL
    }
}




import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDoctorTypesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/doctorTypes/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCTORTYPES_LIST , 
                doctorTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDoctorTypeInfoCard = (doctorTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/doctorTypes/${doctorTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DOCTORTYPE_INFO_CARD , 
                doctorTypeInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveDoctorType = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/doctorTypes/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DOCTORTYPE ,
                    id: id
                })
                toastr.success("Doctor Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddDoctorTypeModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/doctorTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_DOCTORTYPE , 
    //             doctorTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_DOCTORTYPE
    }
}

// ADD DOCTORTYPE
export const AddDoctorType = doctorType => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/doctorTypes/", doctorType)
            .then(res => {
                dispatch({
                type: types.ADD_DOCTORTYPE,
                payload: res.data
                });
                toastr.success("Doctor Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET DOCTORTYPE MODAL
 export const GetDoctorTypesModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/doctorTypes/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_DOCTORTYPE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT DOCTORTYPE
export const EditDoctorType = doctorType => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/doctorTypes/${doctorType.id}/`, doctorType)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DOCTORTYPE,
                payload: resonse.data
                });
                toastr.success("Doctor Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const DoctorTypeModalToggler = () => {
    return {
        type: types.TOGGLE_DOCTORTYPE_MODAL
    }
}



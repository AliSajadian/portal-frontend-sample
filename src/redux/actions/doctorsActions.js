
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDoctorsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/doctors/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCTORS_LIST , 
                doctors : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDoctorInfoCard = (doctorId) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/doctors/${doctorId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DOCTOR_INFO_CARD , 
                doctorInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveDoctor = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/doctors/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DOCTOR ,
                    id: id
                })
                toastr.success("Doctor Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddDoctorModel = () => {
    // return dispatch => {
    //     axios.get('http://172.20.20.45:90/api/doctors/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_DOCTOR , 
    //             doctors : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_DOCTOR
    }
}

// ADD DOCTOR
export const AddDoctor = doctor => {
    return dispatch => {
        axios.post("http://172.20.20.45:90/api/doctors/", doctor)
            .then(res => {
                dispatch({
                type: types.ADD_DOCTOR,
                payload: res.data
                });
                toastr.success("Doctor Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET DOCTOR MODAL
 export const GetDoctorsModal = (id) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/doctors/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_DOCTOR_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT DOCTOR
export const EditDoctor = doctor => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/doctors/${doctor.id}/`, doctor)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DOCTOR,
                payload: resonse.data
                });
                toastr.success("Doctor Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const DoctorModalToggler = () => {
    return {
        type: types.TOGGLE_DOCTOR_MODAL
    }
}



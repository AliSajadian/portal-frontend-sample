
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDocAppointmentTimesList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/appointmenttimes/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCAPPOINTMENTTIMES_LIST , 
                docAppointmentTimes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetFilteredDocAppointmentTimesList = (userID) => {
   return dispatch => {
        axios.get(`http://172.20.20.45:90/api/filteredappointmenttimes/${userID}`)
        .then((response) => {
            dispatch({
                type : types.GET_DOCAPPOINTMENTTIMES_LIST , 
                docAppointmentTimes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDocAppointmentsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/appointments/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCAPPOINTMENTS_LIST , 
                docAppointments : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDocAppointmentInfoCard = (docAppointmentId) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/appointments/${docAppointmentId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DOCAPPOINTMENT_INFO_CARD , 
                docAppointmentInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const AddDocAppointmentModel = () => {
    return {
        type: types.START_DOCAPPOINTMENT_MODAL
    }

}

export const SetDocAppointmentScheduleDayID = (scheduleDayID) => {
    return dispatch => {
                dispatch({
                    type: types.SET_DOCAPPOINTMENT_SCHEDULEDAYID ,
                    payload: scheduleDayID
                })
    }
}

export const SetDocAppointmentDoctorID = (doctorID) => {
    return dispatch => {
                dispatch({
                    type: types.SET_DOCAPPOINTMENT_DOCTORID ,
                    payload: doctorID
                })
    }
}

export const RemoveDocAppointment = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/appointments/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DOCAPPOINTMENT ,
                    id: id
                })
                toastr.success("DocAppointment Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD DocAppointment
export const AddDocAppointment = docAppointment => {
    return dispatch => {     
        // console.log("weekday3: ", docAppointment)
        axios.post("http://172.20.20.45:90/api/appointments/", docAppointment)
            .then(res => {
                dispatch({
                type: types.ADD_DOCAPPOINTMENT,
                payload: res.data
                });
                toastr.success("DocAppointment Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// EDIT DocAppointment
export const EditDocAppointment = docAppointment => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/appointments/${docAppointment.id}/`, docAppointment)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DOCAPPOINTMENT,
                payload: resonse.data
                });
                toastr.success("DocAppointment Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  export const GetDocAppointmentModal = (id) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/appointments/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_DOCAPPOINTMENT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
};

export const DocAppointmentModalToggler = () => {
    return {
        type: types.TOGGLE_DOCAPPOINTMENT_MODAL
    }
}



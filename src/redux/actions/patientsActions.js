
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetPatientsFilesList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/doctorpatientsfiles/')
        .then((response) => {
            dispatch({
                type : types.GET_PATIENTSFILES_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedPatientFileInfoCard = (patientId) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/doctorpatientsfiles/${patientId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_PATIENTFILE_INFO_CARD , 
                payload : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemovePatientFile = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/doctorpatientsfiles/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_PATIENTFILE ,
                    id: id
                })
                toastr.success("Patient File removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD Patient
export const AddPatientFile = patientFile => {
    return dispatch => {     
        axios.post("http://172.20.20.45:90/api/patientsfileupload/", patientFile)
            .then(res => {
                dispatch({
                type: types.ADD_PATIENTFILE,
                payload: res.data
                });
                toastr.success("Patient File add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// EDIT Patient
export const EditPatientFile = patientFile => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/doctorpatientsfiles/${patientFile.id}/`, patientFile)
            .then(resonse => {
                dispatch({
                type: types.EDIT_PATIENTFILE,
                payload: resonse.data
                });
                toastr.success("Patient File Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  // EDIT Patient

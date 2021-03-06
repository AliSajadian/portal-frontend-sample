
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDepartmentsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/departments/')
        .then((response) => {
            dispatch({
                type : types.GET_DEPARTMENTS_LIST , 
                departments : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDepartmentInfoCard = (departmentId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/departments/${departmentId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DEPARTMENT_INFO_CARD , 
                departmentInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveDepartment = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/departments/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DEPARTMENT ,
                    id: id
                })
                toastr.success("Department Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddDepartmentModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/departments/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_DEPARTMENT , 
    //             departments : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_DEPARTMENT
    }

}

// ADD Department
export const AddDepartment = department => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/departments/", department)
            .then(res => {
                dispatch({
                type: types.ADD_DEPARTMENT,
                payload: res.data
                });
                toastr.success("Department Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Department MODAL
 export const GetDepartmentsModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/departments/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_DEPARTMENT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Department
export const EditDepartment = department => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/departments/${department.id}/`, department)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DEPARTMENT,
                payload: resonse.data
                });
                toastr.success("Department Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const DepartmentModalToggler = () => {
    return {
        type: types.TOGGLE_DEPARTMENT_MODAL
    }
}



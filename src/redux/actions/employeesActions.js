
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetEmployeesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/employees/')
        .then((response) => {
            dispatch({
                type : types.GET_EMPLOYEES_LIST, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetEmployeesListEx = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/employeesex/')
        .then((response) => {
            dispatch({
                type : types.GET_EMPLOYEES_LISTEX, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetEmployeeCodesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/employeecodes/')
        .then((response) => {
            dispatch({
                type : types.GET_EMPLOYEE_CODES_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDoctorEmployeesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/doctoremployees/')
        .then((response) => {
            dispatch({
                type : types.GET_EMPLOYEES_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedEmployeeInfoCard = (employeeId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/employees/${employeeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_EMPLOYEE_INFO_CARD , 
                payload : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemoveUser = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/users/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_USER ,
                    id: id
                })
                toastr.success("User removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const RemoveEmployee = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/employees/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_EMPLOYEE ,
                    id: id
                })
                toastr.success("Employee removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddEmployeeModel = () => {
    return {
        type: types.START_ADD_EMPLOYEE
    }
}

// ADD Employee
export const AddEmployee = employee => { 
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/employees/", employee)
            .then(res => {
                dispatch({
                type: types.ADD_EMPLOYEE,
                payload: res.data
                });
                /////id is Null I had to retrieve data again/////
                axios.get('http://portalapi.asft.co/api/employees/')
                .then((response) => {
                    dispatch({
                        type : types.GET_EMPLOYEES_LIST , 
                        employees : response.data
                    })
                })
                .catch(() => {
                    toastr.error('Fail!');
                })
                /////////////////////////////////////////////////
                toastr.success("Employee add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Employee MODAL
 export const GetEmployeesModal = (id) => { 
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/employees/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_EMPLOYEE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Employee
export const EditEmployee = employee => {      
    // console.log("employee.id: ", employee.id)
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/employees/${employee.id}/`, employee)
            .then(resonse => {
                dispatch({
                type: types.EDIT_EMPLOYEE,
                payload: resonse.data
                });
                toastr.success("Employee Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
// EDIT EmployeeEx
export const EditEmployeeEx = (id, employee) => {      
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/employees/${id}/`, employee)
            .then(resonse => {
                dispatch({
                type: types.EDIT_EMPLOYEE,
                payload: resonse.data
                });
                toastr.success("Employee Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const EmployeeModalToggler = () => {
    return {
        type: types.TOGGLE_EMPLOYEE_MODAL
    }
}



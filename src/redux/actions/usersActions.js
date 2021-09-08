
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetUsersList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/users/')
        .then((response) => {
            dispatch({
                type : types.GET_USERS_LIST , 
                users : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedUserInfoCard = (userId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/users/${userId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_USER_INFO_CARD , 
                userInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemoveUser = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/auth/userex/${id}`)
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

export const AddUserModel = () => {
    return {
        type: types.START_ADD_USER
    }
}

// ADD User
export const AddUser = user => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/auth/userex", user)
            .then(res => {
                dispatch({
                type: types.ADD_USER,
                payload: res.data
                });
                toastr.success("User add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// GET User MODAL
export const GetUsersModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/users/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_USER_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT User
export const EditUser = user => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/users/${user.id}/`, user)
            .then(resonse => {
                dispatch({
                type: types.EDIT_USER,
                payload: resonse.data
                });
                toastr.success("User Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const UserModalToggler = () => {
    return {
        type: types.TOGGLE_USER_MODAL
    }
}



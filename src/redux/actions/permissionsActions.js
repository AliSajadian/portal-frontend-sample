
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetPermissionsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/permissions/')
        .then((response) => {
            dispatch({
                type : types.GET_PERMISSIONS_LIST , 
                permissions : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const GetContentTypeList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/contenttypes/')
        .then((response) => {
            dispatch({
                type : types.GET_CONTENTTYPES_LIST, 
                contentTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetUserPermissionsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/userpermissions/')
        .then((response) => {
            dispatch({
                type : types.GET_USERPERMISSIONS_LIST, 
                userPermissions : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetGroupPermissionsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/grouppermissions/')
        .then((response) => {
            dispatch({
                type : types.GET_GROUPPERMISSIONS_LIST, 
                groupPermissions : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedPermissionInfoCard = (permissionId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/permissions/${permissionId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_PERMISSION_INFO_CARD , 
                permissionInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemovePermission = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/permissions/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_PERMISSION ,
                    id: id
                })
                toastr.success("Permission removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddPermissionModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/permissions/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_PERMISSION , 
    //             permissions : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_PERMISSION
    }
}

// ADD PERMISSION
export const AddPermission = permission => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/permissions/", permission)
            .then(res => {
                dispatch({
                type: types.ADD_PERMISSION,
                payload: res.data
                });
                toastr.success("Permission add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET PERMISSION MODAL
 export const GetPermissionsModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/permissions/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_PERMISSION_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT PERMISSION
export const EditPermission = permission => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/permissions/${permission.id}/`, permission)
            .then(resonse => {
                dispatch({
                type: types.EDIT_PERMISSION,
                payload: resonse.data
                });
                toastr.success("Permission Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const EditUserPermission = userPermission => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/auth/userpermissions/${userPermission.id}`, userPermission)
        .then((response) => {
            dispatch({
                type : types.EDIT_USERPERMISSION, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const EditGroupPermission = groupPermission => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/auth/grouppermissions/${groupPermission.id}`, groupPermission)
        .then((response) => {
            dispatch({
                type : types.EDIT_GROUPPERMISSION, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const PermissionModalToggler = () => {
    return {
        type: types.TOGGLE_PERMISSION_MODAL
    }
}



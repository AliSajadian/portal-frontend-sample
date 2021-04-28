
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetGroupsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/groups/')
        .then((response) => {
            dispatch({
                type : types.GET_GROUPS_LIST , 
                groups : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetUserGroupsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/usergroups/')
        .then((response) => {
            dispatch({
                type : types.GET_USERGROUPS_LIST , 
                userGroups : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedGroupInfoCard = (groupId) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/groups/${groupId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_GROUP_INFO_CARD , 
                groupInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveGroup = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/groups/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_GROUP ,
                    id: id
                })
                toastr.success("Survey Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddGroupModel = () => {
    // return dispatch => {
    //     axios.get('http://172.20.20.45:90/api/groups/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_GROUP , 
    //             groups : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_GROUP
    }
}

// ADD GROUP
export const AddGroup = group => {
    return dispatch => {
        axios.post("http://172.20.20.45:90/api/groups/", group)
            .then(res => {
                dispatch({
                type: types.ADD_GROUP,
                payload: res.data
                });
                toastr.success("Survey Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET GROUP MODAL
 export const GetGroupsModal = (id) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/groups/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_GROUP_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT GROUP
export const EditGroup = group => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/groups/${group.id}/`, group)
            .then(resonse => {
                dispatch({
                type: types.EDIT_GROUP,
                payload: resonse.data
                });
                toastr.success("Survey Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  export const EditUserGroup = userGroup => {
    return dispatch => {
        axios.put(`http://172.20.20.45:90/api/auth/usergroups/${userGroup.id}`, userGroup)
        .then((response) => {
            dispatch({
                type : types.EDIT_USERGROUP, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GroupModalToggler = () => {
    return {
        type: types.TOGGLE_GROUP_MODAL
    }
}



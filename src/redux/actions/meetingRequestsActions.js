
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetRequestsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/requests/')
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDateRequestsList = (object) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const requester = object.requester;
    const date = object.date;

    const body = JSON.stringify({
        requester,
        date
    });
    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/daterequests`, body, config)
        .then((response) => {
            dispatch({
                type : types.GET_DATEREQUESTS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetRequestCaterTypesList = (requestId) => {
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/requestcatertypesex/${requestId}`)
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTCATERTYPES_LIST , 
                payload : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const GetRequestEquipmentsList = (requestId) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/requestequipmentsex/${requestId}`)
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTEQUIPMENTS_LIST , 
                payload : response.data
            })
        })
        .catch((error) => {
            toastr.error('Fail!');
            console.log(error);
        })
    }
}

export const LoadRelatedRequestInfoCard = (requestId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/requests/${requestId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_REQUEST_INFO_CARD , 
                payload : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemoveRequest = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/requests/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_REQUEST ,
                    id: id
                })
                toastr.success("Request Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// Remove Request CaterType (CheckBox)
export const RemoveRequestCaterType = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/requestcatertypes/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_REQUESTCATERTYPE ,
                    id: id
                })
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRequestCaterTypeModel = () => {
    return {
        type: types.START_ADD_REQUESTCATERTYPE
    }
}

export const AddRequestEquipmentModel = () => {
    return {
        type: types.START_ADD_REQUESTEQUIPMENT
    }
}

export const EditRequestCaterTypeModel = (requestCaterType) => {
    return dispatch => {
        dispatch({
            type: types.START_REQUESTCATERTYPE_MODAL,
            payload : requestCaterType
        });
    }
}

export const EditRequestEquipmentModel = (requestEquipment) => {
    return dispatch => {
        dispatch({
            type: types.START_REQUESTEQUIPMENT_MODAL,
            payload : requestEquipment
        });
    }
}

export const CheckAuthState = (history) => {   
    return dispatch => {
        let token = sessionStorage.getItem("token");
        if (token) {
            dispatch({
                type : types.AUTH_SUCCESS ,
                token : token ,
                user : JSON.parse(sessionStorage.getItem("user"))
            });
            history.push("/")
        }
    }
}

// ADD Request
export const SaveMeetingRequest = request => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const request_id = request.request_id;
    const title = request.title;
    const date = request.date;
    const start_hour = request.start_hour;
    const end_hour = request.end_hour;
    const description = request.description;
    const confirm = request.confirm;
    const department = request.department;
    const meeting_room = request.meeting_room;
    const requester = request.requesterId;
    const meeting_member_no = request.meeting_member_no;
    const requestCaterTypes = request.requestCaterTypes;
    const requestEquipments = request.requestEquipments;
    const editMood = request.editMood;

    const body = JSON.stringify({
        request_id,
        title, 
        date, 
        start_hour, 
        end_hour, 
        description, 
        confirm, 
        department, 
        meeting_room, 
        requester, 
        meeting_member_no, 
        requestCaterTypes, 
        requestEquipments,
        editMood
    });
    // console.log('&&& body: ', body)

    return dispatch => {
        axios.post(`http://portalapi.asft.co/api/saverequest`, body, config)
            .then(resonse => {
                dispatch({
                type: types.ADD_REQUEST,
                payload: resonse.data
                });
                toastr.success("Request add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// ADD Request CaterType (CheckBox)
export const AddRequestCaterType = requestCaterType => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/requestcatertypes/", requestCaterType)
            .then(res => {
                dispatch({
                type: types.ADD_REQUESTCATERTYPE,
                payload: res.data
                });
                // toastr.success("Request Cater Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// EDIT Request
export const EditRequest = request => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/requests/${request.id}/`, request)
            .then(resonse => {
                dispatch({
                type: types.EDIT_REQUEST,
                payload: resonse.data
                });
                toastr.success("Request Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  

export const RequestCaterTypeModalToggler = () => {
    return {
        type: types.TOGGLE_REQUESTCATERTYPE_MODAL,
    }
}
export const RequestEquipmentModalToggler = () => {
    return {
        type: types.TOGGLE_REQUESTEQUIPMENT_MODAL,
    }
}


export const ClearDateRequests = () => {
    return {
        type: types.CLEAR_REQUESTS,
    }
}


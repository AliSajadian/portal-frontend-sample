

import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetRoomTypesList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/roomtypes/')
        .then((response) => {
            dispatch({
                type : types.GET_ROOMTYPES_LIST , 
                roomTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetRequestRoomTypesList = (date) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/requestroomtypes/${date}`)
        .then((response) => {
            dispatch({
                type : types.GET_REQUESTROOMTYPES_LIST , 
                requestRoomTypes : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedRoomTypeInfoCard = (roomTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/room-types/${roomTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_ROOMTYPE_INFO_CARD , 
                roomTypeInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveRoomType = (id) => {
    let url = `http://portalapi.asft.co/api/roomtypes/${id}`
    return dispatch => {    
        axios.delete(url)
            .then(() => {
                dispatch({
                    type: types.REMOVE_ROOMTYPE,
                    id: id
                })
                toastr.success("Room Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRoomTypeModel = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/roomTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_ROOMTYPE , 
    //             roomTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_ROOMTYPE
    }

}

// ADD RoomType
export const AddRoomType = roomType => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/roomtypes/", roomType)
            .then(res => {
                dispatch({
                type: types.ADD_ROOMTYPE,
                payload: res.data
                });
                // toastr.success("RoomType add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET RoomType MODAL
 export const GetRoomTypesModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/roomtypes/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_ROOMTYPE_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT RoomType
export const EditRoomType = roomType => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/roomtypes/${roomType.id}/`, roomType)
            .then(resonse => {
                dispatch({
                type: types.EDIT_ROOMTYPE,
                payload: resonse.data
                });
                // toastr.success("RoomType Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const RoomTypeModalToggler = () => {
    return {
        type: types.TOGGLE_ROOMTYPE_MODAL
    }
}



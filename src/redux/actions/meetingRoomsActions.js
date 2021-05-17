import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";




export const GetRoomsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/rooms/')
        .then((response) => {
            dispatch({
                type : types.GET_ROOMS_LIST , 
                rooms : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedRoomInfoCard = (roomId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/rooms/${roomId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_ROOM_INFO_CARD , 
                roomInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemoveRoom = (id) => {
    let url = `http://127.0.0.1:8000/api/rooms/${id}`
    return dispatch => {
        axios.delete(url)
            .then(() => {
                dispatch({
                    type: types.REMOVE_ROOM ,
                    id: id
                })
                toastr.success("Room removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRoomModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/rooms/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_ROOM , 
    //             rooms : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_ROOM
    }

}

// ADD Room
export const AddRoom = room => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/rooms/", room)
            .then(res => {
                dispatch({
                type: types.ADD_ROOM,
                payload: res.data
                });
                // toastr.success("Room add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// GET Room MODAL
 export const GetRoomsModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/rooms/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_ROOM_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Room
export const EditRoom = room => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/rooms/${room.id}/`, room)
            .then(resonse => {
                dispatch({
                type: types.EDIT_ROOM,
                payload: resonse.data
                });
                // toastr.success("Room Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const RoomModalToggler = () => {
    return {
        type: types.TOGGLE_ROOM_MODAL
    }
}
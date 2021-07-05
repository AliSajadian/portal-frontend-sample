

import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetRoomEquipmentsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/roomequipments/')
        .then((response) => {
            dispatch({
                type : types.GET_ROOMEQUIPMENTS_LIST , 
                roomEquipments : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetDateRoomEquipmentsList = (date) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/roomequipments/${date}`)
        .then((response) => {
            dispatch({
                type : types.GET_ROOMEQUIPMENTS_LIST , 
                roomEquipments : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedRoomEquipmentInfoCard = (caterTypeId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/cater-types/${caterTypeId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_ROOMEQUIPMENT_INFO_CARD , 
                roomEquipmentInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveRoomEquipment = (id) => {
    let url = `http://127.0.0.1:8000/api/roomequipments/${id}`
    return dispatch => {    
        axios.delete(url)
            .then(() => {
                dispatch({
                    type: types.REMOVE_ROOMEQUIPMENT,
                    id: id
                })
                toastr.success("Request Cater Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddRoomEquipmentModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/caterTypes/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_ROOMEQUIPMENT , 
    //             caterTypes : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_ROOMEQUIPMENT
    }

}

// ADD RoomEquipment
export const AddRoomEquipment = roomEquipment => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/roomequipments/", roomEquipment)
            .then(res => {
                dispatch({
                type: types.ADD_ROOMEQUIPMENT,
                payload: res.data
                });
                // toastr.success("RoomEquipment add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET RoomEquipment MODAL
 export const GetRoomEquipmentsModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/roomequipments/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_ROOMEQUIPMENT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT RoomEquipment
export const EditRoomEquipment = roomEquipment => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/roomequipments/${roomEquipment.id}/`, roomEquipment)
            .then(resonse => {
                dispatch({
                type: types.EDIT_ROOMEQUIPMENT,
                payload: resonse.data
                });
                // toastr.success("RoomEquipment Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

export const RoomEquipmentModalToggler = () => {
    return {
        type: types.TOGGLE_ROOMEQUIPMENT_MODAL
    }
}





import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetEquipmentsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/equipments/')
        .then((response) => {
            dispatch({
                type : types.GET_EQUIPMENTS_LIST , 
                equipments : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedEquipmentInfoCard = (equipmentId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/equipments/${equipmentId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_EQUIPMENT_INFO_CARD , 
                equipmentInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveEquipment = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/equipments/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_EQUIPMENT ,
                    id: id
                })
                toastr.success("Equipment removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddEquipmentModal = () => {
    // return dispatch => {
    //     axios.get('http://portalapi.asft.co/api/equipments/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_EQUIPMENT , 
    //             equipments : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return {
        type: types.START_ADD_EQUIPMENT
    }

}

// ADD Equipment
export const AddEquipment = equipment => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/equipments/", equipment)
            .then(res => {
                dispatch({
                type: types.ADD_EQUIPMENT,
                payload: res.data
                });
                // toastr.success("Equipment add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET Equipment MODAL
 export const GetEquipmentsModal = (id) => {
    return dispatch => {
        axios.get(`http://portalapi.asft.co/api/equipments/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_EQUIPMENT_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT Equipment
export const EditEquipment = equipment => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/equipments/${equipment.id}/`, equipment)
            .then(resonse => {
                dispatch({
                type: types.EDIT_EQUIPMENT,
                payload: resonse.data
                });
                // toastr.success("Equipment Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const EquipmentModalToggler = () => {
    return {
        type: types.TOGGLE_EQUIPMENT_MODAL
    }
}



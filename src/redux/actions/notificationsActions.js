import * as types from "../constants";
// import axios from "../../services/axios";
import axios from "axios";
import { toastr } from "react-redux-toastr";



export const GetNotificationsList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/notifications/')
        .then((response) => {
            dispatch({
                type : types.GET_NOTIFICATIONS_LIST , 
                notifications : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
};
//filtered
export const GetFilteredNotifications = (id) => { 
    //console.log('action GetFilteredNotifications begin: ', id)
    let token = sessionStorage.getItem("token");
    let config = {
        "Authorization" : ""
    };
    if (token) {
        config["Authorization"] = `Token ${token}`;
    }

    const instance = axios.create({
        baseURL : "http://portalapi.asft.co/api/",
        headers : config
    }) 
    return (dispatch) =>  {
    instance.get(`http://portalapi.asft.co/api/filterednotifications/${id}`)
        .then((response) => {
            dispatch({
                type : types.GET_FILTERED_NOTIFICATIONS_LIST , 
                notifications : response.data
            })
            // console.log('action GetFilteredNotifications end: ', response.data)
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
};

export const RemoveNotification = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/notifications/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_NOTIFICATION ,
                    id: id
                })
                // toastr.success("Notification Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
};

// ADD Notification
export const AddNotification = notification => {
    let token = sessionStorage.getItem("token");
    let config = {
        "Authorization" : ""
    };
    if (token) {
        config["Authorization"] = `Token ${token}`;
    }

    const instance = axios.create({
        baseURL : "http://portalapi.asft.co/api/",
        headers : config
    }) 
    return dispatch => {
        instance.post("http://portalapi.asft.co/api/notifications/", notification)
            .then(res => {
                dispatch({
                type: types.ADD_NOTIFICATION,
                payload: res.data
                });
                // toastr.success("Notification Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

// EDIT Notification
export const EditNotification = notification => {
    let token = sessionStorage.getItem("token");
    let config = {
        "Authorization" : ""
    };
    if (token) {
        config["Authorization"] = `Token ${token}`;
    }

    const instance = axios.create({
        baseURL : "http://portalapi.asft.co/api/",
        headers : config
    }) 
    return dispatch => {
        instance.put(`http://portalapi.asft.co/api/notifications/${notification.id}/`, notification)
            .then(resonse => {
                dispatch({
                type: types.EDIT_NOTIFICATION,
                payload: resonse.data
                });
                // toastr.success("Notification Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
  
export const ClearNotifications = () => {
    return {
        type: types.CLEAR_NOTIFICATIONS
    }
}



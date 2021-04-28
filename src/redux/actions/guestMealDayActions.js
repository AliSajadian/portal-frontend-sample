
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetGuestMealDaysExList = (employee_id) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/guestmealdaysex/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_GUESTMEALDAYSEx_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetGuestMealOneDayList  = () => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/guestmealsoneday/`)
        .then((response) => {
            dispatch({
                type : types.GET_GUESTMEALONEDAYS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetGuestMealDaysList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/guestmealdays/')
        .then((response) => {
            dispatch({
                type : types.GET_GUESTMEALSDAY_LIST , 
                guestMealDay : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetServedMealsList = () => {
    return dispatch => {
        axios.get('http://172.20.20.45:90/api/servedmeals/')
        .then((response) => {
            dispatch({
                type : types.GET_SERVEDMEALS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedGuestMealDayInfoCard = (guestMealDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://172.20.20.45:90/api/guestmealdays/${guestMealDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_GUESTMEALDAY_INFO_CARD , 
                guestMealDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const GetGuestMealsDayList = (date, departmentID) => {
    return dispatch => {
        axios.get(`http://172.20.20.45:90/api/guestmealsday/${date}/${departmentID}`)
        .then((response) => {
            dispatch({
                type : types.GET_GUESTMEALSDAY_LIST, 
                guestMealsDay : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
  }

export const RemoveGuestMealDay = (id) => {
    return dispatch => {
        axios.delete(`http://172.20.20.45:90/api/guestmealdays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_GUESTMEALDAY ,
                    id: id
                })
                toastr.success("Guest Meal Day removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD GUESTMEALDAY
export const AddGuestMealDay = guestMealDay => {
    return dispatch => {
        axios.post("http://172.20.20.45:90/api/guestmealdays/", guestMealDay)
            .then(res => {
                dispatch({
                type: types.ADD_GUESTMEALDAY,
                payload: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// EDIT GUESTMEALDAY
export const EditGuestMealDay = guestMealDay => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    let id = guestMealDay.id;
    let departmentId = guestMealDay.department;
    let description = guestMealDay.description;

    const body = JSON.stringify({
    id,
    departmentId,
    description
    });
    return dispatch => {
        axios.post(`http://172.20.20.45:90/api/guestmealsday/`, body, config)
            .then(resonse => {
                dispatch({
                type: types.EDIT_GUESTMEALDAY,
                payload: resonse.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


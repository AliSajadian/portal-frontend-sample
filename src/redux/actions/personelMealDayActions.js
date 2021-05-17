
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetPersonelMealDaysExList = (employee_id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/personelmealdaysex/${employee_id}`)
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALDAYSEx_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetPersonelMealOneDayList  = () => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/personelmealsoneday/`)
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALONEDAYS_LIST , 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetPersonelMealDaysList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/personelmealdays/')
        .then((response) => {
            dispatch({
                type : types.GET_PERSONELMEALDAYS_LIST , 
                personelMealDay : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetServedMealsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/servedmeals/')
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

export const LoadRelatedPersonelMealDayInfoCard = (personelMealDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/personelmealdays/${personelMealDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_PERSONELMEALDAY_INFO_CARD , 
                personelMealDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

export const RemovePersonelMealDay = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/personelmealdays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_PERSONELMEALDAY ,
                    id: id
                })
                toastr.success("Personel Meal Day removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD PERSONELMEALDAY
export const AddPersonelMealDay = personelMealDay => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/personelmealdays/", personelMealDay)
            .then(res => {
                dispatch({
                type: types.ADD_PERSONELMEALDAY,
                payload: res.data
                });
                // toastr.success("Personel Meal Day add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// EDIT PERSONELMEALDAY
export const EditPersonelMealDay = personelMealDay => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/personelmealdays/${personelMealDay.id}/`, personelMealDay)
            .then(resonse => {
                dispatch({
                type: types.EDIT_PERSONELMEALDAY,
                payload: resonse.data
                });
                toastr.success("Personel Meal Day Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
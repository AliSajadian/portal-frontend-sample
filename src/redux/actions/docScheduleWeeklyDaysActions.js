
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDocScheduleWeeklyDaysList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/scheduleweeklydays/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCSCHEDULEWEEKLYDAYS_LIST , 
                docScheduleWeeklyDays : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDocScheduleWeeklyDayInfoCard = (docScheduleWeeklyDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/scheduleweeklydays/${docScheduleWeeklyDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DOCSCHEDULEWEEKLYDAY_INFO_CARD , 
                docScheduleWeeklyDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveDocScheduleWeeklyDay = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/scheduleweeklydays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DOCSCHEDULEWEEKLYDAY ,
                    id: id
                })
                toastr.success("DocScheduleWeeklyDay Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD DocScheduleWeeklyDay
export const AddDocScheduleWeeklyDay = docScheduleWeeklyDay => {
    return dispatch => {     
        axios.post("http://portalapi.asft.co/api/scheduleweeklydays/", docScheduleWeeklyDay)
            .then(res => {
                dispatch({
                type: types.ADD_DOCSCHEDULEWEEKLYDAY,
                payload: res.data
                });
                toastr.success("DocScheduleWeeklyDay Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// EDIT DocScheduleWeeklyDay
export const EditDocScheduleWeeklyDay = docScheduleWeeklyDay => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/scheduleweeklydays/${docScheduleWeeklyDay.id}/`, docScheduleWeeklyDay)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DOCSCHEDULEWEEKLYDAY,
                payload: resonse.data
                });
                toastr.success("DocScheduleWeeklyDay Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };



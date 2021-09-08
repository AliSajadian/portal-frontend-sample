
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetDocScheduleDaysList = () => {
    return dispatch => {
        axios.get('http://portalapi.asft.co/api/scheduledays/')
        .then((response) => {
            dispatch({
                type : types.GET_DOCSCHEDULEDAYS_LIST , 
                docScheduleDays : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}


export const LoadRelatedDocScheduleDayInfoCard = (docScheduleDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://portalapi.asft.co/api/scheduledays/${docScheduleDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_DOCSCHEDULEDAY_INFO_CARD , 
                docScheduleDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveDocScheduleDay = (id) => {
    return dispatch => {
        axios.delete(`http://portalapi.asft.co/api/scheduledays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_DOCSCHEDULEDAY ,
                    id: id
                })
                toastr.success("DocScheduleDay Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD DocScheduleDay
export const AddDocScheduleDay = docScheduleDay => {
    return dispatch => {     
        axios.post("http://portalapi.asft.co/api/scheduledays/", docScheduleDay)
            .then(res => {
                dispatch({
                type: types.ADD_DOCSCHEDULEDAY,
                payload: res.data
                });
                toastr.success("DocScheduleDay Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// EDIT DocScheduleDay
export const EditDocScheduleDay = docScheduleDay => {
    return dispatch => {
        axios.put(`http://portalapi.asft.co/api/scheduledays/${docScheduleDay.id}/`, docScheduleDay)
            .then(resonse => {
                dispatch({
                type: types.EDIT_DOCSCHEDULEDAY,
                payload: resonse.data
                });
                toastr.success("DocScheduleDay Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };



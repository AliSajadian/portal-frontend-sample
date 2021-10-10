import * as types from "../constants";
import axios from "axios";
import { toastr } from "react-redux-toastr";



export const AuthStart = (username, password, history) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({
        username,
        password
    });
    
    // const body = {
    //     // email: email,
    //     username: username,
    //     password: password
    // };

    return dispatch => {
        dispatch({
            type: types.AUTH_START
        });

        axios.post("http://portalapi.asft.co/api/auth/login", body, config)
            .then((response) => {
                // console.log('response.data.error: ', response.data.error)
                if(response.data && response.data.error && response.data.error !== 0){
                    throw new Error(response.data.error)
                }

                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("userid", JSON.stringify(response.data.user.id))
                sessionStorage.setItem("username", JSON.stringify(response.data.user.username))
                sessionStorage.setItem("user", JSON.stringify(response.data.user))
                sessionStorage.setItem("pic", response.data.employee.length > 0 ? response.data.employee[0].picture : '')
                sessionStorage.setItem("employeeid", response.data.employee.length > 0 ? response.data.employee[0].id : '')
                sessionStorage.setItem("emp_first_name", response.data.employee.length > 0 ? response.data.employee[0].first_name : '')
                sessionStorage.setItem("emp_last_name", response.data.employee.length > 0 ? response.data.employee[0].last_name : '')             
                sessionStorage.setItem("isDoctor", JSON.stringify(response.data.isDoctor))
                sessionStorage.setItem("permissions", JSON.stringify(response.data.permissions))
                sessionStorage.setItem("groups", JSON.stringify(response.data.groups))

                sessionStorage.setItem("baseinfoAdmin", JSON.stringify([
                    'add_user', 
                    'add_department', 
                    'add_notification']))
                sessionStorage.setItem("surveysAdmin", JSON.stringify([
                    'add_answer', 
                    'add_question']))
                sessionStorage.setItem("surveysUser", JSON.stringify([
                    'add_user_answer']))
                sessionStorage.setItem("docappointmentAdmin", JSON.stringify([
                    'add_doctors', 
                    'add_doc_schedules_week_days', 
                    'add_doc_schedules_days', 
                    'add_doc_patients', 
                    '81add_doc_appointment_times']))
                sessionStorage.setItem("docappointmentUser", JSON.stringify([
                    'add_doc_patients_files']))
                sessionStorage.setItem("restaurantAdmin", JSON.stringify([
                    'add_resturaunt_meal', 
                    'add_resturaunt_day_meal']))
                sessionStorage.setItem("restaurantUser", JSON.stringify([
                    'add_resturaunt_employee_day_meal']))
                sessionStorage.setItem("restaurantDepartmentSecretery", JSON.stringify([
                    'view_department_resturant_daily_statistics', 
                    'add_resturaunt_guest_day_meal']))
                sessionStorage.setItem("restaurantContractor", JSON.stringify([
                    'view_resturant_daily_statistics']))
                sessionStorage.setItem("meetingRequestAdmin", JSON.stringify([
                    'add_meeting_cater_type', 
                    'add_meeting_equipment', 
                    'add_meeting_request', 
                    'add_meeting_room', 
                    'add_meeting_room_type',                                                            
                    'add_meeting_room_equipment', 
                    'add_meeting_request_cater_type', 
                    'add_meeting_ request_ equipment']))
                sessionStorage.setItem("meetingRequestUser", JSON.stringify([
                    'add_meeting_request']))
                sessionStorage.setItem("doctor", JSON.stringify([
                    'add_doc_patients_files', 
                    'add_doc_patients']))

                console.log("permissions", JSON.stringify(response.data.permissions))

                dispatch({
                    type: types.AUTH_SUCCESS,
                    token: response.data.token,
                    user: response.data.user,
                });
                history.push("/")
            }).catch((error) => {
                console.log('error: ', error);
                dispatch({
                    type : types.AUTH_FAIL, 
                    error : error
                })
            })
    }
}

export const UserRegister = (user) => {
    return dispatch => {
        axios.post("http://portalapi.asft.co/api/auth/register/", user)
            .then(res => {
                dispatch({
                type: types.USER_REGISTER,
                payload: res.data
                });
                toastr.success("User add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const ChangeUsernamePassword = (userid, username, currentpassword, newpassword) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    // Request Body
    const body = JSON.stringify({
        userid,
        username,
        currentpassword,
        newpassword
    });
    return dispatch => {
        axios.put("http://portalapi.asft.co/api/auth/change_password/", body, config)
            .then(res => {
                dispatch({
                type: types.USERNAME_PASSWORD_CHANGE,
                payload: res.data
                });
                toastr.success("Password Changed succesfuly")
            })
            .catch((error) => {
                console.log(error);
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

export const Log_Out = () => {
    return dispatch => {
        // sessionStorage.removeItem("token");
        // sessionStorage.removeItem("user");
        sessionStorage.clear();
        // console.log("sessionStorage: ", sessionStorage)
        dispatch({
            type : types.CLEAR_NOTIFICATIONS ,            
        })
        dispatch({
            type : types.LOG_OUT ,            
        })
    }
}
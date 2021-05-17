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

        axios.post("http://127.0.0.1:8000/api/auth/login", body, config)
            .then((response) => {
                if(response.data && response.data.error && response.data.error !== ''){
                    throw new Error('Info is not complited')
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

                sessionStorage.setItem("baseinfoAdmin", JSON.stringify(['13', '25', '29', '33', '37', '41', '45', '49']))
                sessionStorage.setItem("surveysAdmin", JSON.stringify(['53', '57', '61', '65']))
                sessionStorage.setItem("surveysUser", JSON.stringify(['69']))
                sessionStorage.setItem("docappointmentAdmin", JSON.stringify(['77', '89', '93', '97']))
                sessionStorage.setItem("docappointmentUser", JSON.stringify(['73']))
                sessionStorage.setItem("restaurantAdmin", JSON.stringify(['101', '109']))
                sessionStorage.setItem("restaurantUser", JSON.stringify(['105']))
                sessionStorage.setItem("doctor", JSON.stringify(['81', '85']))

                dispatch({
                    type: types.AUTH_SUCCESS,
                    token: response.data.token,
                    user: response.data.user,
                });
                history.push("/")
            }).catch((error) => {
                console.log(error);
                dispatch({
                    type : types.AUTH_FAIL, 
                    error : error
                })
            })
    }
}

export const UserRegister = (user) => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/auth/register/", user)
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
        axios.put("http://127.0.0.1:8000/api/auth/change_password/", body, config)
            .then(res => {
                dispatch({
                type: types.USERNAME_PASSWORD_CHANGE,
                payload: res.data
                });
                toastr.success("User add succesfuly")
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
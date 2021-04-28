import * as types from "../constants";
import { toastr } from "react-redux-toastr";

export const SaveBrowserHistory = (history) => {
    return {
        type: types.SAVE_BROWSER_HISTORY,
        history: history
    }
}


export const GetCurrentLocation = () => {
    
    return dispatch => {
        navigator.geolocation.getCurrentPosition((position) => {
            let currentCoords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            dispatch({
                type: types.GET_CURRENT_LOCATION_SUCCESS,
                position: currentCoords
            })
        } , (error) => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                  dispatch({
                      type : types.GET_CURRENT_LOCATION_FAILED
                  })
                  toastr.error("Failed To Get Your Current Location")
                  break;
                case error.POSITION_UNAVAILABLE:
                    dispatch({
                        type : types.GET_CURRENT_LOCATION_FAILED
                    })
                    
                    toastr.error("Failed To Get Your Current Location(Unavailable!)")
                    break;
                case error.TIMEOUT:
                    dispatch({
                        type : types.GET_CURRENT_LOCATION_FAILED
                    })
                    toastr.error("Failed To Get Your Current Location")
                    break;
                case error.UNKNOWN_ERROR:
                    dispatch({
                        type : types.GET_CURRENT_LOCATION_FAILED
                    })
                    toastr.error("Failed To Get Your Current Location")
                    break;
              }
        })
    }
}
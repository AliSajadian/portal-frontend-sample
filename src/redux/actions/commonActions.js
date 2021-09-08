import * as types from "../constants";
import { toastr } from "react-redux-toastr";

const getPersianWeekDay = date => {
    var weekday = new Array(7);
    weekday[0] = "یکشنبه";
    weekday[1] = "دوشنبه";
    weekday[2] = "سه شنبه";
    weekday[3] = "چهارشنبه";
    weekday[4] = "پنجشنبه";
    weekday[5] = "جمعه";
    weekday[6] = "شنبه";
    return weekday[date.getDay()];
}
  
export const GetPersianMonth = date => {
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate();
    const weekDay = getPersianWeekDay(date);
    let persianDate = ''
    switch(month){
        case 1:
            if(day < 20){
                persianDate = weekDay + ' ' + (day + 11) + ' دی ';
            }
            else{
                persianDate =  weekDay + ' ' + (day - 19) + ' بهمن ';
            }break
        case 2:
            if(day < 19){
                persianDate = weekDay + ' ' + (day + 12) + ' بهمن ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 18) + ' اسفند ';
            }break
        case 3:
            if(day < 20){
                persianDate = weekDay + ' ' + (day + 10) + ' اسفند ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 19) + ' فروردین ';
            }break
        case 4:
            if(day < 20){
                persianDate = weekDay + ' ' + (day + 12) + ' فروردین ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 19) + ' اردیبهشت ';
            }break
        case 5:
            if(day < 21){
                persianDate = weekDay + ' ' + (day + 11) + ' اردیبهشت ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' خرداد ';
            }break
        case 6:
            if(day < 21){
                persianDate = weekDay + ' ' + (day + 11) + ' خرداد ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' تیر ';
            }break
        case 7:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + ' تیر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + ' مرداد ';
            }break
        case 8:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + ' مرداد ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + 'شهریور';
            }break
        case 9:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + 'شهریور';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + ' مهر ';
            }break
        case 10:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 8) + ' مهر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + 'آبان';
            }break
        case 11:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 9) + ' آبان ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 21) + ' آذر ';
            }break
        case 12:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 9) + ' آذر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 21) + ' دی ';
            }break
        default:
    }
    return {
        type: types.GET_PERSIAN_DATE,
        payload: persianDate
    }
};

export const GetPersianMonthEx = date => {
    date = new Date(date)
    let month = date.getUTCMonth()+1; 
    let day = date.getUTCDate();
    const weekDay = getPersianWeekDay(date);
    let persianDate = ''
    switch(month){
        case 1:
            if(day < 21){
                persianDate = weekDay + ' ' + (day + 10) + ' دی ';
            }
            else{
                persianDate =  weekDay + ' ' + (day - 20) + ' بهمن ';
            }break
        case 2:
            if(day < 20){
                persianDate = weekDay + ' ' + (day + 11) + ' بهمن ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 19) + ' اسفند ';
            }break
        case 3:
            if(day < 21){
                persianDate = weekDay + ' ' + (day + 9) + ' اسفند ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' فروردین ';
            }break
        case 4:
            if(day < 21){
                persianDate = weekDay + ' ' + (day + 11) + ' فروردین ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' اردیبهشت ';
            }break
        case 5:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 11) + ' اردیبهشت ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' خرداد ';
            }break
        case 6:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 11) + ' خرداد ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 20) + ' تیر ';
            }break
        case 7:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + ' تیر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + ' مرداد ';
            }break
        case 8:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + ' مرداد ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + 'شهریور';
            }break
        case 9:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 9) + 'شهریور';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + ' مهر ';
            }break
        case 10:
            if(day < 23){
                persianDate = weekDay + ' ' + (day + 8) + ' مهر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 22) + 'آبان';
            }break
        case 11:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 9) + ' آبان ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 21) + ' آذر ';
            }break
        case 12:
            if(day < 22){
                persianDate = weekDay + ' ' + (day + 9) + ' آذر ';
            }
            else{
                persianDate = weekDay + ' ' + (day - 21) + ' دی ';
            }break
        default:
    }
    return {
        type: types.GET_PERSIAN_DATE,
        payload: persianDate
    }
};

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
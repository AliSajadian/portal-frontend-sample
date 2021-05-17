
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetCurrentMonthDates = () => {
    const currentDate = new Date();
    let y = currentDate.getFullYear(); 
    let month = currentDate.getMonth()+1;
    let day = currentDate.getDate();
    // console.log('currentDate: ', currentDate, ', #currentDate: ', y, '-', month, '-', day);
    let m1, d1, m2, d2
    switch(month){
      case 1://Jan
        m1 = (day < 20) ? 1 : 2;
        m2 = (day < 20) ? 2 : 3;
        d1 = (day < 20) ? 20 : 19;
        d2 = (day < 20) ? 19 : 20;
          break;
      case 2://feb
        m1 = (day < 19) ? 2 : 3;
        m2 = (day < 19) ? 3 : 4;
        d1 = (day < 19) ? 19 : 20;
        d2 = (day < 19) ? 20 : 20;
          break;
      case 3://Mar
        m1 = (day < 20) ? 3 : 4;
        m2 = (day < 20) ? 4 : 5;
        d1 = (day < 20) ? 20 : 20;
        d2 = (day < 20) ? 20 : 21;
          break;
      case 4://Apr
        m1 = (day < 20) ? 4 : 5;
        m2 = (day < 20) ? 5 : 6;
        d1 = (day < 20) ? 20 : 20;
        d2 = (day < 20) ? 20 : 21;
          break;
      case 5://May
        m1 = (day < 21) ? 5 : 6;
        m2 = (day < 21) ? 6 : 7;
        d1 = (day < 21) ? 21 : 21;
        d2 = (day < 21) ? 21 : 22;
          break;
      case 6://Jun
        m1 = (day < 21) ? 6 : 7;
        m2 = (day < 21) ? 7 : 8;
        d1 = (day < 21) ? 21 : 22;
        d2 = (day < 21) ? 22 : 22;
          break;
      case 7://Jul
        m1 = (day < 22) ? 7 : 8;
        m2 = (day < 22) ? 8 : 9;
        d1 = (day < 22) ? 22 : 22;
        d2 = (day < 22) ? 22 : 22;
          break;
      case 8://Aug
        m1 = (day < 22) ? 8 : 9;
        m2 = (day < 22) ? 9 : 10;
        d1 = (day < 22) ? 22 : 22;
        d2 = (day < 22) ? 22 : 22;
          break;
      case 9://Sep
        m1 = (day < 22) ? 9 : 10;
        m2 = (day < 22) ? 10 : 11;
        d1 = (day < 22) ? 22 : 22;
        d2 = (day < 22) ? 22 : 21;
          break;
      case 10://Oct
        m1 = (day < 22) ? 10 : 11;
        m2 = (day < 22) ? 11 : 12;
        d1 = (day < 22) ? 22 : 21;
        d2 = (day < 22) ? 21 : 21;
          break;
      case 11://Nov
        m1 = (day < 21) ? 11 : 12;
        m2 = (day < 21) ? 12 : 1;
        d1 = (day < 21) ? 21 : 21;
        d2 = (day < 21) ? 21 : 20;
          break;
      case 12://Dec
        m1 = (day < 21) ? 12 : 1;
        m2 = (day < 21) ? 1 : 2;
        d1 = (day < 21) ? 21 : 20;
        d2 = (day < 21) ? 20 : 19;
          break;                                                            
      default:
    }

    // console.log('month: ', month, 'm1: ', m1, 'd1: ', d1, 'm2: ', m2, 'd2: ', d2)
    // let startdate = new Date(y, m1, d1), enddate = new Date(y, m2, d2)
    let startdate = new Date(((month !== 12) ? y : ((month === 12 && day >= 21) ? y + 1 : y)) , m1-1, d1), 
        enddate = new Date((month < 11 ? y : ((month === 11 && day >= 21) ? y + 1 : ((month === 12) ? y + 1 : y))), m2-1, d2)
    let date = null
    let newdates = []

    date = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate())

    // console.log('###startdate@: ', startdate);
    // console.log('###enddate@: ', enddate);

    let tmpdate = null
    let index = 1

    while(startdate < enddate){
      newdates.push({id: index, date: date});
        // console.log("###date: ", date);

      startdate.setDate(startdate.getDate() + 1);
      tmpdate = date
      date = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate())

      // console.log('###currentdate#: ', date);

      if(tmpdate.getDate() === date.getDate()){
        startdate.setDate(startdate.getDate() + 1);
        tmpdate = date
        date = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate())
        // console.log('##currentdate$: ', date);
      }
    //   console.log("**startdate: ", startdate);
      index++;
    }

    // console.log("newdates: ", newdates);

    return dispatch => {
        dispatch({
            type : types.GET_CURRENTMONTHDATES , 
            payload : newdates
        })
    }
};

export const GetMealDaysList = () => { 
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/mealdays/')
        .then((response) => {
            dispatch({
                type : types.GET_MEALDAYS_LIST , 
                mealsDays : response.data
            })
            // console.log("Actions.MealsDays: ", response.data);
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const GetMealDaysExList = () => { 
  return dispatch => {
      axios.get('http://127.0.0.1:8000/api/mealdaysex/')
      .then((response) => {
          dispatch({
              type : types.GET_MEALDAYS_LIST , 
              mealsDays : response.data
          })
          // console.log("Actions.MealsDays: ", response.data);
      })
      .catch(() => {
          toastr.error('Fail!');
      })
  }
}

export const GetMealsDayList = (date, departmentID) => {
  return dispatch => {
      axios.get(`http://127.0.0.1:8000/api/mealsday/${date}/${departmentID}`)
      .then((response) => {
          dispatch({
              type : types.GET_MEALSDAY_LIST, 
              MealsDay : response.data
          })
          // console.log("Action GetMealsDayList response.data: ", response.data)
      })
      .catch(() => {
          toastr.error('Fail!');
      })
  }
}

export const LoadRelatedMealDayInfoCard = (mealDayId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/mealdays/${mealDayId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_MEALDAY_INFO_CARD, 
                mealDayInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}

// ADD MEALDAY
export const RemoveMealDay = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/mealdays/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_MEALDAY ,
                    id: id
                })
                toastr.success("Meal Day removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

// ADD MEALDAY
export const AddMealDay = mealDay => { 
  // console.log("ADD ACTION BEFORE MealDay")
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/mealdays/", mealDay)
            .then(res => {
                dispatch({
                type: types.ADD_MEALDAY,
                payload: res.data
                });
                toastr.success("Meal Day add succesfuly")
                // console.log("ADD ACTION AFTER MealDay:", res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

// EDIT MEALDAY
export const EditMealDay = mealDay => {        
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/mealdays/${mealDay.id}/`, mealDay)
            .then(resonse => {
                dispatch({
                type: types.EDIT_MEALDAY,
                payload: resonse.data
                });
                // toastr.success("Meal Day Edit succesfuly")
                // console.log("Edit ACTION response.mealsDays: ", resonse.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };

  export const EditGuestMealDayJunction = (guestMealDayJunction) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    let departmentId = guestMealDayJunction.department_id;
    let id = guestMealDayJunction.id;
    let mealDayId = guestMealDayJunction.resturant_day_mea_id;
    let guestMealDayId = guestMealDayJunction.resturant_guest_day_meal_id;
    let qty = guestMealDayJunction.qty;
    let mood = guestMealDayJunction.mood;
    const body = JSON.stringify({
      departmentId,
      id,
      mealDayId,
      guestMealDayId,
      qty, 
      mood
    });
    console.log('body: ', body)
    return dispatch => {
        axios.post(`http://127.0.0.1:8000/api/guestmealdayjunction/`, body, config)
            .then(resonse => {
                dispatch({
                type: types.EDIT_GUESTMEALDAYJUNCTION,
                MealsDay: resonse.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


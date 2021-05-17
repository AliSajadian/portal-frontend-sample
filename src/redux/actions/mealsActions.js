
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";



export const GetMealsList = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:8000/api/meals/')
        .then((response) => {
            dispatch({
                type : types.GET_MEALS_LIST, 
                meals : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
}

export const LoadRelatedMealInfoCard = (mealId) => {        
    return (dispatch) =>  {
        axios.get(`http://127.0.0.1:8000/api/meals/${mealId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_MEAL_INFO_CARD , 
                mealInfo : response.data
            })
        }).catch (() => {
            toastr.error('Fail!');
        })
    }
}


export const RemoveMeal = (id) => {
    return dispatch => {
        axios.delete(`http://127.0.0.1:8000/api/meals/${id}`)
            .then(() => {
                dispatch({
                    type: types.REMOVE_MEAL ,
                    id: id
                })
                toastr.success("Survey Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}

export const AddMealModel = () => {
    // return dispatch => {
    //     axios.get('http://127.0.0.1:8000/api/meals/')
    //     .then((response) => {
    //         dispatch({
    //             type : types.START_ADD_MEAL , 
    //             meals : response.data
    //         })
    //     })
    //     .catch(() => {
    //         toastr.error('Fail!');
    //     })
    // }
    return{
        type : types.START_ADD_MEAL
    }
}

// ADD MEAL
export const AddMeal = Meal => {
    return dispatch => {
        axios.post("http://127.0.0.1:8000/api/meals/", Meal)
            .then(res => {
                dispatch({
                type: types.ADD_MEAL,
                payload: res.data
                });
                toastr.success("Survey Type add succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };


// GET MEAL MODAL
 export const GetMealsModal = (id) => {
    return dispatch => {
        axios.get(`http://127.0.0.1:8000/api/meals/${id}`)
        .then((response) => {
            dispatch({
                type : types.START_MEAL_MODAL, 
                payload : response.data
            })
        })
        .catch(() => {
            toastr.error('Fail!');
        })
    }
} 

// EDIT MEAL
export const EditMeal = Meal => {
    return dispatch => {
        axios.put(`http://127.0.0.1:8000/api/meals/${Meal.id}/`, Meal)
            .then(resonse => {
                dispatch({
                type: types.EDIT_MEAL,
                payload: resonse.data
                });
                toastr.success("Survey Type Edit succesfuly")
            })
            .catch((error) => {
                console.log(error);
            });
    }
  };
  
export const MealModalToggler = () => {
    return {
        type: types.TOGGLE_MEAL_MODAL
    }
}

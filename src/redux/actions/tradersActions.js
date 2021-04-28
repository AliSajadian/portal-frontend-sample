
import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";


export const GetTradersList = () => {
    return dispatch => {
        axios.get("https://www.yourmarkethub.io/api/lmm-traders/")
        .then((response) => {
            dispatch({
                type : types.GET_TRADERS_LIST , 
                traders : response.data
            })
        })
        .catch(() => {
            toastr.error("Fail!");
        })
    }
}


export const LoadRelatedTraderInfoCard = (traderId) => {        
    return (dispatch) =>  {
        axios.get(`https://www.yourmarkethub.io/api/lmm-traders/${traderId}`)
        .then((response) => {
            dispatch({
                type : types.LOAD_RELATED_TRADER_INFO_CARD , 
                traderInfo : response.data
            })
        }).catch (() => {
            toastr.error("Fail !");
        })
    }
}


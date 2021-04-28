import * as types from "../constants";
import axios from "../../services/axios";
import {toastr} from "react-redux-toastr";



export const GetMarketsFromServer = () => {   
    return (dispatch) => {
        axios.get("https://www.yourmarkethub.io/api/market-layout-pitch-get/")
        .then((response) => {
            dispatch({
                type : types.GET_MARKETS_FROM_SERVER ,
                markets : response.data
            })
        })
        .catch(() => {
            toastr.error("Fail Connect To Server!")
        })
    }
}
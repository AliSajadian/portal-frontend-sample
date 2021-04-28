
import axios from "../../services/axios";
import { GET_PRICETYPES_LIST, REMOVE_PRICE_TYPE, TOGGLE_PRICE_TYPE_MODAL } from "../constants";
import { toastr } from "react-redux-toastr";


export const getPriceTypesList = () => dispatch => {
    axios.get("https://www.yourmarkethub.io/api/pricetypes/")
        .then((response) => {
            dispatch({
                type: GET_PRICETYPES_LIST,
                payload: response.data
            })
        })
        .catch(() => {
            toastr.error("Fail!");
        })
}


export const RemovePriceType = (id) => {
    return dispatch => {
        axios.delete(`https://www.yourmarkethub.io/api/pricetypes/${id}`)
            .then(() => {
                dispatch({
                    type: REMOVE_PRICE_TYPE,
                    id: id
                })
                toastr.success("Price Type removed succesfuly")
            }).catch((error) => {
                console.log(error);
            })
    }
}


export const PriceTypeModalToggler = () => {
    return {
        type: TOGGLE_PRICE_TYPE_MODAL
    }
}

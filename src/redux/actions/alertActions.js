

import * as types from "../constants";



export const AlertOpenModel = (message) => {
    return {
        type: types.OPEN_ALERT_MODAL,
        message: message
    }

}

export const AlertModalToggler = () => {
    return {
        type: types.TOGGLE_ALERT_MODAL
    }
}



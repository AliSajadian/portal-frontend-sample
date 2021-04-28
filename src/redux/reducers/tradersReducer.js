import * as types from "../constants";

const initialState = {
    traders: [],
    traderInfo: null
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.GET_TRADERS_LIST:
            return {
                ...state,
                traders: actions.traders
            }
        case types.LOAD_RELATED_TRADER_INFO_CARD:
            return {
                ...state,
                traderInfo: actions.traderInfo
            }
        default:
            return state;
    }
}




export default reducer;
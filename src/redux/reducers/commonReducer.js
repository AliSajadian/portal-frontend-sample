import * as types from "../constants";

const initialState = {
    browserHistory: null,
    currentLocation: {
        lat: 0,
        lng: 0
    }
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.SAVE_BROWSER_HISTORY:
            return {
                ...state,
                browserHistory: actions.history
            }
        case types.GET_CURRENT_LOCATION_SUCCESS:
            
            return {
                ...state,
                currentLocation: {
                    ...state.currentLocation,
                    lat: actions.position.lat,
                    lng: actions.position.lng
                }
            }
        case types.GET_CURRENT_LOCATION_FAILED:
            
            return state;
        default:
            return state
            
    }
}

export default reducer;
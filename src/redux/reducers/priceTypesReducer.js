import { GET_PRICETYPES_LIST, REMOVE_PRICE_TYPE, TOGGLE_PRICE_TYPE_MODAL } from "../constants";

const initialState = {
    priceTypes: [],
    priceTypeInfo: null,
    isModalOpen: false
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case GET_PRICETYPES_LIST:
            return {
                ...state,
                priceTypes: actions.payload
            }
        case REMOVE_PRICE_TYPE:
            return {
                ...state,
                priceTypes: state.priceTypes.filter(q => q.id !== actions.id)
            }
        case TOGGLE_PRICE_TYPE_MODAL:
            return {
                ...state, 
                isModalOpen: !state.isModalOpen
            }   
        default:
            return state;
    }
}

export default reducer;
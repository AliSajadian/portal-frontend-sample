import * as types from "../constants";


const initialState = {
    isModalOpen: false,
    datePickerDefaultSelected: new Date(),
    selectedLayoutForCreateMarketId: 0,
    hoveredPitchOnTheMapId: null,
    selectedLayout: null,
    users: [],
    disableMarketDates: [],
    marketInEditStage: null,
    hoveredPitchIdInEditPage: null
}


const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.PICK_MARKET_DATE:
            if (actions.disableDates) {
                return {
                    ...state,
                    isModalOpen: !state.isModalOpen,
                    selectedLayoutForCreateMarketId: actions.layoutId,
                    disableMarketDates: actions.disableDates
                }
            } else {
                return {
                    ...state,
                    isModalOpen: !state.isModalOpen,
                }
            }


        case types.CHOOSE_MARKET_DATE:
            return {
                ...state,
                datePickerDefaultSelected: actions.date
            }

        case types.UPDATE_PITCH_INFO_TABLE:

            return {
                ...state,
                hoveredPitchOnTheMapId: actions.id != -1 ? actions.id : null
            }
        case types.LOAD_RELATED_LAYOUT:
            return {
                ...state,
                selectedLayout: actions.data
            }
        case types.LOAD_USERS:
            return {
                ...state,
                users: actions.users

            }
        case types.CHANGE_CALENDAR_MONTH_HANDLER:
            return {
                ...state,
                disableMarketDates: actions.disableDates
            }
        case types.GET_INDIVISUAL_MARKET_FROM_SERVER:

            return {
                ...state,
                marketInEditStage: actions.market
            }
        case types.GET_MARKET_DISABLE_DATES_IN_MARKET_EDIT_PAGE:
            return {
                ...state,
                disableMarketDates: actions.disableDates
            }
        case types.CHANGE_MARKET_DATE_ASYNC:
            return {
                ...state,
                marketInEditStage: actions.market
            }
        case types.EDIT_MARKET:
            return {
                ...state,
                marketInEditStage: actions.market
            }
        case types.UPDATE_PITCH_TABLE_IN_EDIT_MARKET_PAGE:
            if (actions.id != -1) {
                return {
                    ...state,
                    hoveredPitchIdInEditPage: actions.id
                }
            } else {
                return {
                    ...state,
                    hoveredPitchIdInEditPage: null
                }
            }
        case types.HANDLE_MAP_ZOOM_ON_MARKET_EDIT_PAGE:
            let market = {...state.marketInEditStage };
            for (let index = 0; index < market.pitch_market_layout.length; index++) {
                const element = market.pitch_market_layout[index];
                switch (actions.zoom) {
                    case 22:
                        element.pitch.width_pix = element.pitch.width * 34;
                        element.pitch.length_pix = element.pitch.length * 34;
                        break;
                    case 21:
                        element.pitch.width_pix = element.pitch.width * 16;
                        element.pitch.length_pix = element.pitch.length * 16;
                        break;
                    case 20:
                        element.pitch.width_pix = element.pitch.width * 8;
                        element.pitch.length_pix = element.pitch.length * 8;
                        break;
                    case 19:
                        element.pitch.width_pix = element.pitch.width * 4;
                        element.pitch.length_pix = element.pitch.length * 4;
                        break;
                    case 18:
                        element.pitch.width_pix = element.pitch.width * 2;
                        element.pitch.length_pix = element.pitch.length * 2;
                        break;
                    case 17:
                        element.pitch.width_pix = element.pitch.width * 1;
                        element.pitch.length_pix = element.pitch.length * 1;
                        break;
                    case 16:
                            element.pitch.width_pix = element.pitch.width * 0;
                            element.pitch.length_pix = element.pitch.length * 0;
                            break;
                    case 15:
                            element.pitch.width_pix = element.pitch.width * 0;
                            element.pitch.length_pix = element.pitch.length * 0;
                            break;
                    default:
                        break;
                }
            }
            return {
                ...state,
                marketInEditStage : market
            }
        default:
            return state;

    }
}


export default reducer;


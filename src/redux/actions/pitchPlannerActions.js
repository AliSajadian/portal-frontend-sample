import * as types from "../constants";
import axios from "../../services/axios";
import { toastr } from "react-redux-toastr";





export const MarketDateModalToggleHandler = (layoutId, relatedDate, requestPlace) => {

    if (relatedDate != null) {
        return (dispatch) => {

            axios.get(`https://www.yourmarkethub.io/api/booked-days/?date_booked=${relatedDate.getFullYear()}-${relatedDate.getMonth() + 1}`)
                .then((response) => {
                    let disableDates = [];
                    response.data.forEach((q) => {
                        disableDates.push(q.market_date);
                    })

                    dispatch({
                        type: types.PICK_MARKET_DATE,
                        layoutId: layoutId,
                        disableDates: disableDates
                    })
                }).catch((err) => {
                    toastr.error("err")
                })

        }
    } else {
        return {
            type: types.PICK_MARKET_DATE,

        }
    }
}


export const ChooseMarketDate = (date) => {
    return {
        type: types.CHOOSE_MARKET_DATE,
        date: date
    }
}



export const LoadRelatedLayout = (layoutId) => {
    return (dispatch) => {
        axios.get(`https://www.yourmarkethub.io/api/layout-pitch/${layoutId}`)
            .then((response) => {
                dispatch({
                    type: types.LOAD_RELATED_LAYOUT,
                    data: response.data
                })
            }).catch((error) => {
                toastr.error("Fail.")
               
            });
    }
}


export const UpdatePitchInfoTable = (id) => {
    return {
        type: types.UPDATE_PITCH_INFO_TABLE,
        id: id
    }
}


export const LoadUsers = () => {
    return (dispatch) => {
        axios.get("https://www.yourmarkethub.io/api/lmm-traders/")
            .then((response) => {

                dispatch({
                    type: types.LOAD_USERS,
                    users: response.data
                })
            }).catch((error) => {
                console.log(error)
            })
    }
}

export const SaveMarket = (market) => {
    return (dispatch) => {
        axios.post("https://www.yourmarkethub.io/api/market-layout-pitch/", market, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                toastr.success("Market Saved Succesfuly")
            })
            .catch((error) => {
                toastr.error("Fail.")

            })
    }
}

export const ChangeCalendarMonthHandler = (relatedDate) => {
    return (dispatch) => {
        axios.get(`https://www.yourmarkethub.io/api/booked-days/?date_booked=${relatedDate.getFullYear()}-${relatedDate.getMonth() + 1}`)
            .then((response) => {
                let disableDates = [];
                response.data.forEach((q) => {
                    disableDates.push(q.market_date);
                })
                dispatch({
                    type: types.CHANGE_CALENDAR_MONTH_HANDLER,
                    disableDates: disableDates
                })
            })
            .catch(() => {
                toastr.error("Fail");
            })
    }
}


export const GetMarketFromServer = (id) => {
    return (dispatch) => {
        axios.get(`https://www.yourmarkethub.io/api/deep-market-layout-pitch/${id}`)
            .then((response) => {
                dispatch({
                    type: types.GET_INDIVISUAL_MARKET_FROM_SERVER,
                    market: response.data
                })
                
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

export const ChangeMarketDateAsync = (market, date) => {
    return dispatch => {
        axios.get(`https://www.yourmarkethub.io/api/market-layout-pitch/${market.id}`)
            .then((response) => {
                let updatedMarket = { ...response.data };
                updatedMarket.market_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                axios.put(`https://www.yourmarkethub.io/api/market-layout-pitch/${market.id}`, updatedMarket)
                    .then(() => {
                        dispatch({
                            type: types.CHANGE_MARKET_DATE_ASYNC,
                            market: {
                                ...market,
                                market_date: date
                            }
                        })
                        toastr.success("Market Date Updated Successfuly!")
                    }).catch(() => {
                        toastr.error("Fail!")
                    })

            }).catch(() => {
                toastr.error("Fail !");
            })


    }
}

export const GetMarketDisableDatesInMarketEditPage = (relatedDate) => {   
    return dispatch => {
        axios.get(`https://www.yourmarkethub.io/api/booked-days/?date_booked=${new Date(relatedDate).getFullYear()}-${(new Date(`${relatedDate}`)).getMonth() + 1}`)
            .then((responce) => {
                dispatch({
                    type: types.GET_MARKET_DISABLE_DATES_IN_MARKET_EDIT_PAGE,
                    disableDates: responce.data
                })
            }).catch(() => {
                toastr.error("Fail To Load Disable Dates!")
            })
    }
}


export const EditMarket = (market) => {
    return dispatch => {
        axios.put(`https://www.yourmarkethub.io/api/market-layout-pitch/${market.id}`, market)
            .then(() => {
                axios.get(`https://www.yourmarkethub.io/api/deep-market-layout-pitch/${market.id}`)
                    .then((response) => {
                        dispatch({
                            type: types.EDIT_MARKET,
                            market: response.data
                        })
                        toastr.success("Market Edited Successfuly!");
                    })


            }).catch((error) => {
                toastr.error("Fail!");

            })

    }
}

export const DeleteMarket = (id, history) => {
    console.log(id)
    return dispatch => {
        axios.delete(`https://www.yourmarkethub.io/api/market-layout-pitch/${id}`)
            .then(() => {
                dispatch({
                    type: types.DELETE_MARKET,
                    id: id
                })
                toastr.success("Market Removed Successfuly !");
                history.push("/")
            }).catch((error) => {
                toastr.error("Fail!")

            })

    }
}



export const UpdatePitchTableInEditMarketPage = (id) => {
    return {
        type: types.UPDATE_PITCH_TABLE_IN_EDIT_MARKET_PAGE,
        id: id
    }
}


export const HandleMapZoomInMarketEditPage = (context) => {
    return {
        type : types.HANDLE_MAP_ZOOM_ON_MARKET_EDIT_PAGE,
        zoom : context.zoom
    }
}
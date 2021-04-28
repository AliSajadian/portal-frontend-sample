import * as types from "../constants";


const backColors = ["#5b7dff" , "#47bac1" , "#a180da" , "#f44455" , "#fcc100"];

const initialState = {
    markets : [] ,
    
}


const reducer = (state = initialState , actions) => {
    switch (actions.type) {
        case types.GET_MARKETS_FROM_SERVER:
          
            return{
                ...state,
                markets : actions.markets.map((q) => {
                    //let index = Math.floor(Math.random() * 6);
                    return {
                        id : q.id,
                        title : `Layout : ${q.layout.layout_name} \n \n PitchCount : ${q.pitch_market_layout.length}`,
                        start : q.market_date ,
                        end : q.market_date,
                        backgroundColor : "#5b7dff" ,
                        borderColor : "#80808000"
                    }
                })
            }
        case types.DELETE_MARKET :
            return {
                ...state, 
                markets : state.markets.filter(q => q.id != actions.id)
            }   
        default:
            return state;
            break;
    }
}

export default reducer;
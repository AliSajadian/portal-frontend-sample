import * as types from "../../redux/constants";


const initialState = {
    isShowSpinner : false , 
    authToken : "" ,
    user : null , 
    error : null
}


const reducer = (state = initialState , actions) => {
    switch (actions.type) {
        case types.AUTH_START:
            return {
                ...state , 
                error : null , 
                isShowSpinner : !state.isShowSpinner
            }
        case types.AUTH_SUCCESS:
            return{
                ...state , 
                authToken : actions.token , 
                user : actions.user ,
                error : null , 
                isShowSpinner : !state.isShowSpinner
            }
        case types.AUTH_FAIL : 
            return {
                ...state ,
                error : actions.error ,
                isShowSpinner : !state.isShowSpinner 
            }
        case types.LOG_OUT : console.log('---Logout---')
            return {
                ...state ,
                authToken : "" ,
                user : null , 
                error : null , 
                isShowSpinner : false
            }
        default:
            return state;
    }
}

export default reducer;
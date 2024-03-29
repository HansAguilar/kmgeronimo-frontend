import { FETCH_FEE_FAILED, FETCH_FEE_REQUEST, FETCH_FEE_SUCCESS } from "../ActionTypes";

const reducer = (state = {}, action)=>{
    switch(action.type){
        case FETCH_FEE_REQUEST:
            return { ...state, loading:true }
        case FETCH_FEE_SUCCESS:
            return { ...state, payload:action.payload, loading:false }
        case FETCH_FEE_FAILED:
            return { ...state, error:action.error, loading:false }
        default:
            return state;
    }
}

export default reducer;
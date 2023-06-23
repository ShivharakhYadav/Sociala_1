import appConstant from "../../actions/app/actionTypes";

const initialState = {
    snackInformation: {
        open: false,
        message: "success",
        type: "success"
    }
}
const appReducer: any = (state = initialState, action: any) => {
    // console.log("appReduce",action.type, action.payload);
    switch (action.type) {
        case appConstant.SHOW_NOTIFICATION: return {
            ...state, snackInformation: action.payload
        }
        default: {
            return state
        }
    }
}
export default appReducer;
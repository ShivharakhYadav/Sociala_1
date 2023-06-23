import appConstant from "./actionTypes";

const show_Notification = (payload: any) => ({
    type: appConstant.SHOW_NOTIFICATION,
    payload: payload
})

const appActions = { show_Notification }
export default appActions;
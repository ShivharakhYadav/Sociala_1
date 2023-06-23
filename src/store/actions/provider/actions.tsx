import providersConstant from "./actionTypes";

const save_user = (payload: any) => ({
    type: providersConstant.SAVE_USER,
    payload: payload
})

const add_post = (payload: any) => ({
    type: providersConstant.FOLLOWING_POSTS,
    payload: payload
})

const update_user = (payload: any) => ({
    type: providersConstant.UPDATE_USER,
    payload: payload
})

const change_notification_status = (payload: any) => ({
    type: providersConstant.CHANGE_NOTIFICATION_STATUS,
    payload: payload
})

const followRequestAccepted = (payload: any)=>({
    type:providersConstant.FOLLOW_ACCEPTED,
    payload:payload
})

const providerActions = { save_user, add_post, update_user, change_notification_status,followRequestAccepted };
export default providerActions;
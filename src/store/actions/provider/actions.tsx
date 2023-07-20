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

const followRequestAccepted = (payload: any) => ({
    type: providersConstant.FOLLOW_ACCEPTED,
    payload: payload
})

const requestedToFollowNotification = (payload: any) => ({
    type: providersConstant.REQUESTED_TO_FOLLOW_NOTIFICATION,
    payload: payload
});

const RequestAcceptedNotification = (payload: any) => ({
    type: providersConstant.FOLLOW_REQUEST_ACCEPTED_NOTIFICATION,
    payload: payload
});

const providerActions = {
    save_user, add_post, update_user,
    change_notification_status,
    followRequestAccepted,
    RequestAcceptedNotification,
    requestedToFollowNotification
};
export default providerActions;
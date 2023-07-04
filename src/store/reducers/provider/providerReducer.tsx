import providersConstant from "../../actions/provider/actionTypes"
import { setToLocalStorage } from "../../../utils/LocalStorageHelper"
import * as localStorageKeys from "../../../utils/Keys"
// import { UserDataType } from "../../../Types/types";

export type UserDataType = {
    _id: string;
    followers: Array<number>;
    followings: Array<number>;
    name: string;
    notifications: Array<object>;
    pendingRequests: Array<number>;
    mobileno: string;
    post: Array<object>;
    saved: Array<object>;
    tagged: Array<object>;
    username: string;
}
export interface initialStateType {
    user: UserDataType;
}
const initialState: initialStateType = {
    user: {
        _id: "",
        followers: [],
        followings: [],
        name: "",
        notifications: [],
        pendingRequests: [],
        mobileno: "",
        post: [],
        saved: [],
        tagged: [],
        username: ""
    }
}

const providerReducer: any = (state = initialState, action: any) => {
    console.log("providerReduce", action.type, action.payload)
    switch (action.type) {
        case providersConstant.SAVE_USER: return { ...state, user: action.payload };

        case providersConstant.UPDATE_USER:
            let oldValue: any = state.user;
            for (let key in action.payload) {
                if (Array.isArray(action.payload[key])) {
                    oldValue[key] = [...oldValue[key], ...action.payload[key]]
                }
                else {
                    oldValue[key] = action.payload[key]
                }
            }
            setToLocalStorage(localStorageKeys.SOCIALA_USER, oldValue);
            for (let key in action.payload) {
                if (Array.isArray(action.payload[key])) {
                    return { ...state, user: { ...state.user, [key]: oldValue[key] } }

                }
                else {
                    return { ...state, user: { ...state.user, [key]: action.payload[key] } }
                }
            }
            break;
        case providersConstant.FOLLOWING_POSTS: return {
            ...state, posts: action.payload
        }

        case providersConstant.CHANGE_NOTIFICATION_STATUS:
            let ids = action.payload;
            let notifications = state?.user?.notifications;
            notifications?.map((item: any) => {
                ids.map((singleId: any) => {
                    if ((singleId == item.notificationId)) {
                        item.readed = true;
                    }
                });
                return item
            });
            setToLocalStorage(localStorageKeys.SOCIALA_USER, { ...state.user, notification: notifications })
            return {
                ...state, user: { ...state.user, notification: notifications }
            }
        case providersConstant.FOLLOW_ACCEPTED:
            // const checkAvail = state?.user?.followings?.filter((ids: any) => ids == action.payload);
            // if (checkAvail.length < 1) {
            const newObj = { ...state.user, followings: [...state?.user?.followings, action.payload] };
            setToLocalStorage(localStorageKeys.SOCIALA_USER, newObj);
            return {
                ...state, user: { ...state.user, followings: [...state?.user?.followings, action.payload] }
            }
            // }
            break;

        case providersConstant.LOGOUT: return state.user = {
            _id: "",
            followers: [],
            followings: [],
            name: "",
            notifications: [],
            pendingRequests: [],
            mobileno: "",
            post: [],
            saved: [],
            tagged: [],
            username: ""
        }

        default: {
            return state
        }
    }
}
export default providerReducer;
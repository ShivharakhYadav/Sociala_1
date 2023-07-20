import providersConstant from "../../actions/provider/actionTypes"
import { setToLocalStorage } from "../../../utils/LocalStorageHelper"
import * as localStorageKeys from "../../../utils/Keys"
// import { UserDataType } from "../../../Types/types";

export type UserDataType = {
    _id: string;
    followers: Array<number>;
    followings: Array<number>;
    name: string;
    notification: Array<object>;
    pendingRequest: Array<number>;
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
        notification: [],
        pendingRequest: [],
        mobileno: "",
        post: [],
        saved: [],
        tagged: [],
        username: ""
    }
}

// type payloadType = {
//     type: string,
//     payload: UserDataType
// }

const providerReducer: any = (state = initialState, action: any) => {
    // const { user } = state;
    console.log("payload", action)
    switch (action.type) {
        case providersConstant.SAVE_USER: return { ...state, user: action.payload };

        case providersConstant.UPDATE_USER:
            // for (let key in action.payload) {
            //     if (Array.isArray(action.payload[key])) {
            //         return {
            //             user: {
            //                 ...state.user,
            //                 [key]: [...state.user[key], ...action.payload[key]]
            //                 // [key]: action.payload[key]

            //             }
            //         }

            //     }
            //     else {
            //         return { user: { ...state.user, [key]: action.payload[key] } }
            //     }
            // }
            return;

        case providersConstant.FOLLOWING_POSTS: return {
            ...state, user: { ...state.user, post: action.payload }
        }

        case providersConstant.REQUESTED_TO_FOLLOW_NOTIFICATION:
            return {
                ...state, user: {
                    ...state.user,
                    notification: [...state.user.notification, ...action.payload.notification],
                    pendingRequest: [...state.user.pendingRequest, ...action.payload.pendingRequest]
                }
            };

        case providersConstant.FOLLOW_REQUEST_ACCEPTED_NOTIFICATION:
            return {
                ...state, user: {
                    ...state.user,
                    notification: [...state.user.notification, ...action.payload.notification]
                }
            };

        case providersConstant.CHANGE_NOTIFICATION_STATUS:
            let ids = action.payload;
            let notification = state?.user?.notification;
            notification?.map((item: any) => {
                ids.map((singleId: any) => {
                    if ((singleId == item.notificationId)) {
                        item.readed = true;
                    }
                });
                return item
            });

            return {
                ...state, user: { ...state.user, notification: notification }
            }
        case providersConstant.FOLLOW_ACCEPTED:
            return {
                ...state, user: { ...state.user, followings: [...state?.user?.followings, action.payload] }
            }

        case providersConstant.LOGOUT: return state.user = {
            _id: "",
            followers: [],
            followings: [],
            name: "",
            notification: [],
            pendingRequest: [],
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
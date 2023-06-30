
export type userDataType = {
    id: string;
    followers: Array<number>;
    followings: Array<number>;
    name: string;
    notification: Array<object>;
    password: string;
    pendingRequests: Array<number>;
    phone: string;
    post: Array<object>;
    saved: Array<object>;
    tagged: Array<object>;
    username: string;
}
export interface initialStateType {
    user: userDataType
}

export type stateTypes = {
    appReducer: any;
    providerReducer: initialStateType
}
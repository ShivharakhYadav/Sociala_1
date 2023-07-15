
export type UserDataType = {
    _id?: string;
    id?: string | undefined;
    username: string;
    name: string;
    mobileno?: string;
    email?: String;
    followers: Array<number>;
    followings: Array<number>;
    account_type?: String;
    notification: Array<object>;
    post: Array<object>;
    saved?: Array<object>;
    tagged?: Array<object>;
    pendingRequest?: Array<number>;
    bio?: String;
    gender?: String;
    profileimg?: String;
}
export interface initialStateType {
    user: UserDataType
}

export type stateTypes = {
    appReducer: any;
    providerReducer: initialStateType
}
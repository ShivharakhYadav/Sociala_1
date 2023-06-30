import axios from "axios";

const baseURL = "http://localhost:4100";

const authURL = `${baseURL}/auth/`;

const authInstance = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
    },
});

type UserDataType = {
    id: number;
    username: string;
    password: String;
    name: String;
    mobileno: Number;
    email: String;
    followers: Array<number>;
    followings: Array<number>;
    account_type: String;
    notifications: Array<number>;
    post: Array<object>;
    saved: Array<object>;
    // tagged: Array;
    pendingRequests: Array<number>;
    bio: String;
    gender: String;
    profileimg: String;
}
type loginResponseType = {
    accessToken: string;
    message: string;
    success: Boolean;
    data: UserDataType;
};


export const loginRequest = async (body: any): Promise<loginResponseType | null> => {
    try {
        const loginResponse = await authInstance.post("login", JSON.stringify(body));
        console.log("loginRespinse", loginResponse);
        if (loginResponse?.status === 200) {
            return loginResponse?.data;
        }
        return null;
    } catch (err) {
        console.log("loginRequest errror", err);
        return null;
    }
};

export const registerRequest = async (body: any) => {
    try {
        const registerResponse = await authInstance.post(
            "register",
            JSON.stringify(body)
        );
        if (registerResponse?.status === 200) {
            return registerResponse?.data;
        }
        return null;
    } catch (err) {
        console.log("registerRequest errror", err);
        return null;
    }
};

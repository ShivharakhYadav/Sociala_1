import axios from "axios";
import { UserDataType } from "../Types/types";

const baseURL = "http://localhost:4100";

const authURL = `${baseURL}/auth/`;

const authInstance = axios.create({
    baseURL: authURL,
    headers: {
        "Content-Type": "application/json",
    },
});

authInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error?.response?.data);
    }
)

type loginResponseType = {
    accessToken?: string;
    message: string;
    success?: Boolean;
    data?: UserDataType;
};


export const loginRequest = async (body: any): Promise<loginResponseType> => {
    try {
        const payload = JSON.stringify(body);
        const loginResponse = await authInstance.post("login", payload);
        return loginResponse?.data;
    } catch (error: any) {
        console.log("loginRequest errror", error);
        return { message: error?.message }
    }
};

type registerResponseType = {
    message: string;
    success?: Boolean;
}
export const registerRequest = async (body: any): Promise<registerResponseType> => {
    try {
        const payload = JSON.stringify(body);
        const registerResponse = await authInstance.post("register", payload);
        return registerResponse?.data;
    } catch (error: any) {
        console.log(error)
        return { message: error?.message }
    }
};

import axios from 'axios';
import { UserDataType } from '../Types/types';

const baseURL = 'http://localhost:4100';

const accountURL = `${baseURL}/account/`;

const accountInstance = axios.create({
    baseURL: accountURL
});

accountInstance.interceptors.request.use(
    function (request) {
        // Do something before request is sent
        return request;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

accountInstance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        console.log(error)
        return Promise.reject(error);
    }
)


type responseTypes = {
    message: string;
    success: Boolean;
    data: UserDataType;
};


export const getSingleUserRequest = async (id: string): Promise<responseTypes | null> => {
    try {
        let response = await accountInstance.get(`user/${id}`);
        if (response.status === 200) {
            return response?.data;
        }
        return null
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const searchUserRequest = async (key: string) => {
    try {
        let response = await accountInstance.get(`search/?name=${key}`);
        if (response.status === 200) {
            return response?.data;
        }
        return null
    } catch (err) {
        return null;
    }
}

export const putRequest = async (url: any, headers: any, body: any) => {
    try {
        const defaultHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        const newHeaders = typeof (headers) == "object" ? { ...defaultHeaders, ...headers } : defaultHeaders;

        let reponse = await fetch(url, {
            method: "PUT",
            headers: newHeaders,
            body: JSON.stringify(body)
        });
        let result = await reponse.json();
        return result;
    }
    catch (err) {
        return null
    }
}




// export const singleRecordURL = `${accountURL}user/`;
// export const searchUserURL = `${accountURL}search/`;
// export const updateUserURL = `${accountURL}update/`;
// export const uploadNewPostURL = `${accountURL}upload/`;
// export const notificationURL = `${accountURL}changeNotificationStatus/`;
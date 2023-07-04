import axios from 'axios';
import { UserDataType } from '../Types/types';

const baseURL = 'http://localhost:4100';

const accountURL = `${baseURL}/account/`;

type responseTypes = {
    message: string;
    success: Boolean;
    data: UserDataType;
};

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

export const getSingleUserRequest = async (username: string): Promise<responseTypes | null> => {
    try {
        let response = await accountInstance.get(`user/${username}`);
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


// export const singleRecordURL = `${accountURL}user/`;
// export const searchUserURL = `${accountURL}search/`;
// export const updateUserURL = `${accountURL}update/`;
// export const uploadNewPostURL = `${accountURL}upload/`;
// export const notificationURL = `${accountURL}changeNotificationStatus/`;
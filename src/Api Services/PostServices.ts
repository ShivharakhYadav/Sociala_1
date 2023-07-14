import axios from 'axios';

const baseURL = "http://localhost:4100";
const postURL = `${baseURL}/post/`;

const postInstance = axios.create({
    baseURL: postURL,
    headers: {
        "Content-Type": "application/json"
    }
})

postInstance.interceptors.response.use(
    function (response) {
        return response?.data;
    },
    function (error) {
        return Promise.reject(error?.response?.data);
    }
)

export const getLatestPost = async (body: any) => {
    try {
        console.log("body", body);
        const payload = JSON.stringify(body);
        const response: any = await postInstance.post("userspost", payload);
        return response;
    } catch (err) {
        console.log("getLatestPost", err);
    }
}
import jwtDecode from 'jwt-decode';
import { toast, TypeOptions } from 'react-toastify';
export const tokenDecode = (token: string): Boolean => {
    try {
        const decodedToken: any = jwtDecode(token);
        const todayUTCString = new Date().toUTCString();
        const todayUTCSecond = new Date(todayUTCString).getTime();
        const expUTCSecond = decodedToken.exp * 1000;
        if (expUTCSecond < todayUTCSecond) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err)
        return true;
    }
}

type messageType = "success" | "info" | "warning" | "error" | "default";

export const showToastMessage = (type: messageType, message: string) => {
    try {
        const toastOption: any = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        };

        // toast[type](message, toastOption);

        if (type == "success") {
            toast.success(message, toastOption)
        }
        else {
            toast.error(message, toastOption)
        }
    } catch (err) {
        console.log("failed");
    }
};
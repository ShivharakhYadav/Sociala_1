type localDataType = {
    id: string;
    accessToken: string
}
export const getLocalStorageData = (key: string): localDataType | null => {
    try {
        let jsonData: any = localStorage.getItem(key);
        if ((jsonData !== "undefined" && jsonData !== "null") && typeof (JSON.parse(jsonData)) == "object") {
            const parsedData = JSON.parse(jsonData);
            return parsedData;
        }
        return null
    }
    catch (err) {
        return null
    }
}

export const setToLocalStorage = (key: string, data: object) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (err) {
        console.log(err);
    }
}
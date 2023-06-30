import jwtDecode from 'jwt-decode'
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
        return false
    }
}
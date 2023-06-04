import React, { useEffect } from "react";
import { getLocalStorageData } from "../../utils/LocalStorageHelper";
import { useNavigate } from 'react-router-dom'
import { SOCIALA_USER } from "../../utils/Keys";
import Heading from "../../components/Heading";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const localData = getLocalStorageData(SOCIALA_USER);
        if (localData != null) {
            navigate("/")
        }
    }, [])
    return (
        <>
            <Heading variant="h1" text="D" />
        </>
    )
}

export default Login;
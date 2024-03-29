import React, { useEffect, useState } from "react";
import { getLocalStorageData, setToLocalStorage } from "../../utils/LocalStorageHelper";
import { Link, useNavigate } from 'react-router-dom'
import { SOCIALA_USER } from "../../utils/Keys";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { loginRequest } from '../../Api Services/AuthService';
import { useDispatch, useSelector } from "react-redux";
import providerActions from "../../store/actions/provider/actions";
import { showToastMessage, tokenDecode } from "../../utils/HelperFunction";
import { getSingleUserRequest } from "../../Api Services/AccountServices";
import { stateTypes } from "../../Types/types";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state: stateTypes) => state?.providerReducer?.user);
    const [authCredential, setAuthCredential] = useState({
        authUserId: "",
        authPassword: ""
    })
    const onChangeMethod = (e: any) => {
        let field = e.target.name;
        let value = e.target.value;
        setAuthCredential({ ...authCredential, [field]: value })
    }
    const loginUser = async () => {
        const result = await loginRequest(authCredential);
        console.log("--loginRequest---", result);

        if (result?.success === true) {
            // navigate('/test');
            dispatch(providerActions.save_user(result?.data));
            setToLocalStorage(SOCIALA_USER, { accessToken: result?.accessToken, username: result?.data?.username })
        }
        else {
            showToastMessage("error", result?.message)
        }
    }

    useEffect(() => {
        (async () => {
            const localData = getLocalStorageData(SOCIALA_USER);
            if (localData != null && localData.accessToken && user.username) {
                const tokenExpired = tokenDecode(localData?.accessToken)
                if (!tokenExpired && !user?.username) {
                    const userResult = await getSingleUserRequest(localData?.username);
                    dispatch(providerActions.save_user(userResult?.data));
                }
                // else {
                //     navigate("/")
                // }
            }
        })();
    }, [])
    return (
        <Container disableGutters>
            <Grid container>
                <Grid item md={6}>
                    <img src="login-bg.jpg" style={{ height: "99vh" }} width="100%" alt="login-bg" />
                </Grid>
                <Grid item md={6} display="flex" justifyContent="center" alignItems="center">
                    <Container >
                        <Grid container display="flex" justifyContent="center" alignItems="center">
                            <Grid item
                                xs={12} sm={6} md={6} lg={5} xl={5}
                                display="flex"
                                gap="20px"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                padding={"20px"}
                            >
                                <Box>
                                    <Typography variant='h4'>Sign In</Typography>
                                </Box>
                                <Box>

                                    <TextField id="filled-basic" label="Mobile No or phone" variant="outlined"
                                        // className={classes.textFiledStyle}
                                        name="authUserId"
                                        value={authCredential.authUserId}
                                        onChange={onChangeMethod}
                                    // error={erros.emailorphone}
                                    // helperText={erros.emailorphone && "Enter mobile no or phone"}
                                    />
                                </Box>
                                <Box>
                                    <TextField id="filled-basic" label="Password" variant="outlined"
                                        // className={classes.textFiledStyle}
                                        name="authPassword"
                                        value={authCredential.authPassword}
                                        onChange={onChangeMethod}
                                    // error={erros.password}
                                    // helperText={erros.password && "Enter password"}
                                    />
                                </Box>
                                <Box>
                                    <Link to='#'>Forgot password?</Link>
                                    <Link to='/register'>New User</Link>
                                </Box>
                                <Box>
                                    <Button variant="contained"
                                        // className={classes.buttonStyle} 
                                        onClick={loginUser}
                                    >SIGN IN</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
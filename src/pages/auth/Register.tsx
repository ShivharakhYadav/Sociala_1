import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../../Api Services/AuthService";
import { useDispatch } from "react-redux"
import providerActions from "../../store/actions/provider/actions";

type userDetail = {
    username: string,
    name: string,
    password: string,
    emailorphone?: string | number,
    email?: string,
    mobileno?: number
}
const Register = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState<userDetail>({
        username: '',
        name: '',
        password: '',
        emailorphone: ""
    })

    const onChangeMethod = (e: any) => {
        let field = e.target.name;
        let value = e.target.value;
        // if (value.length > 0) {
        //     setDetails({ ...details, [field]: e.target.value });
        //     setErrors({ ...erros, [field]: false })
        // }
        // else {
        setDetails({ ...details, [field]: e.target.value });
        //     setErrors({ ...erros, [field]: true })
        // }
    }

    const registerUser = async () => {
        debugger
        const newRequestObj = details
        if (isNaN(details?.emailorphone as any)) {
            newRequestObj.email = details.emailorphone as string;
            delete newRequestObj.emailorphone;
        }
        else {
            newRequestObj.mobileno = details.emailorphone as number;
            delete newRequestObj.emailorphone;
        }
        const result: any = await registerRequest(newRequestObj);
        // }
    }

    function checkEmailOrNot(str: string) {

    }
    return (
        <Container disableGutters>
            <Grid container>
                <Grid item md={6}>
                    <img src="register-bg.jpg" style={{ height: "99vh" }} width="100%" alt="login-bg" />
                </Grid>
                <Grid item md={6} display="flex" justifyContent="center" alignItems="center">
                    <Container >
                        <Grid container display="flex" justifyContent="center" alignItems="center">
                            <Grid item
                                // component={Paper}
                                // gap={2}
                                // elevation={5}
                                xs={12} sm={6} md={6} lg={5} xl={5}
                                display="flex"
                                gap="20px"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                padding={"20px"}
                            >
                                <Box>
                                    <Typography variant='h4'>Create Account</Typography>
                                </Box>
                                <Box>
                                    <TextField id="filled-basic" label="Mobile No or phone" variant="outlined"
                                        // className={classes.textFiledStyle}
                                        name="emailorphone"
                                        value={details.emailorphone}
                                        onChange={onChangeMethod}
                                    // error={erros.emailorphone}
                                    // helperText={erros.emailorphone && "Enter mobile no or phone"}
                                    />
                                </Box>

                                <Box>
                                    <TextField id="filled-basic" label="Name" variant="outlined"
                                        // className={classes.textFiledStyle}
                                        name="name"
                                        value={details.name}
                                        onChange={onChangeMethod}
                                    // error={erros.name}
                                    // helperText={erros.name && "Enter name"}
                                    />
                                </Box>
                                <Box>
                                    <TextField id="filled-basic" label="Username" variant="outlined"
                                        name="username"
                                        // className={classes.textFiledStyle}
                                        value={details.username}
                                        onChange={onChangeMethod}
                                    // error={erros.username}
                                    // helperText={erros.username && "Enter username"}
                                    />
                                </Box>
                                <Box>
                                    <TextField id="filled-basic" label="Password" variant="outlined"
                                        // className={classes.textFiledStyle}
                                        name="password"
                                        value={details.password}
                                        onChange={onChangeMethod}
                                    // error={erros.password}
                                    // helperText={erros.password && "Enter password"}
                                    />
                                </Box>
                                <Box>
                                    <Link to='/'>Already User</Link>
                                </Box>
                                <Box>
                                    <Button variant="contained"
                                        // className={classes.buttonStyle}
                                        onClick={registerUser}
                                    >Sign up</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Register;
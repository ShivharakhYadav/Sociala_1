import { useState, useEffect } from 'react'
import { Box, Avatar, Typography, TextField, Select, MenuItem, Button, FormControl, Container, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from "react-redux";
// import { setToLocalStorage, getLocalStorageData } from '../../utilities/LocalStorageHandler';
// import localStorageKeys from '../../utilities/LocalStorageKeys';
// import providerActions from '../../store/actions/provider/actions';
// import { getRequest, putRequest } from '../../services/Services';
// import { baseURL, updateUserURL } from '../../services/Links';
// import { io } from 'socket.io-client';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const useStyles = makeStyles({
    root: {
        // background: "red",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        /* justify-content: center; */
        alignItems: "center",
        '& > *': {
            // background: "green",
            paddingBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
            '& > *:nth-of-type(odd)': {
                // background: "red",
                width: "30%", display: "flex", justifyContent: "flex-end"
            },
            '& :nth-of-type(even)': {
                // background: "green",
                width: "60%"
            }
        }
    },
    formMainDiv: {
        // backgroundColor: "tomato",
        '& > *': {
            //backgroundColor: "yellow",
            width: "100%",
            '& .MuiOutlinedInput-notchedOutline': {
                width: "auto"
            }
        }
    }
});

function EditProfile() {
    let details: any;
    let state = useSelector((state: any) => state?.providerReducer?.user);
    const dispatch = useDispatch();
    const [profileimage, setProfileImage] = useState<any>("");
    const [enable, disable] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let classes = useStyles();
    // const previousData: any = getLocalStorageData(localStorageKeys.USER_DETAILS);
    // if (previousData != null) {
    //     details = previousData;
    // }
    const [userDetails, setUserDetails] = useState<any>({
        name: { value: details?.name, updated: false },
        username: { value: details?.username, updated: false },
        bio: { value: details?.bio, updated: false },
        email: { value: details?.email, updated: false },
        phoneNumber: { value: details?.phoneNumber, updated: false },
        gender: { value: details?.gender, updated: false }
    })

    const handleChange = (e: any) => {
        // let field = e.target.name;
        // let values = e.target.value;
        // if (details[field] === values) {
        //     setUserDetails({ ...userDetails, [field]: { value: values, updated: false } })
        //     disable(true)
        // }
        // else {
        //     disable(false);
        //     setUserDetails({ ...userDetails, [field]: { value: values, updated: true } })
        // }
    };

    const handleSubmit = async () => {
        // let newBody: any = {}
        // for (const key in userDetails) {
        //     if (userDetails[key].updated) {
        //         newBody[key] = userDetails[key].value
        //     }
        // }
        // let result = await putRequest(`${updateUserURL}${state._id}`, "", newBody);
        // if (result.success) {
        //     setToLocalStorage(localStorageKeys.USER_DETAILS, result.data)
        //     dispatch(providerActions.update_user(result.data))
        // }
    }

    const handleProfileChange = async () => {
        // let data: any = new FormData();
        // data.append("profileimage", profileimage);
        // let response = await fetch(`http://localhost:4100/updateProfileImage?userid=${state._id}&username=${state.username}`, {
        //     method: "PUT",
        //     body: data
        // })
        // let result = await response.json();
        // setToLocalStorage(localStorageKeys.USER_DETAILS, result.data);
        // dispatch(providerActions.save_user(result.data));
        // handleClose();
    }
    return (
        <Container>
            <Box>
                <Box className={classes.root}>
                    <Box>
                        <Box>
                            <Avatar alt={state?.username?.toUpperCase()} src={state?.profileimg} />
                        </Box>
                        <Box>
                            <Typography>{userDetails?.username.value}</Typography>
                            <Typography color={"blue"} onClick={handleOpen} sx={{ cursor: "pointer" }}>Change Profile Pic</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Name</Typography>
                        </Box>
                        <Box className={classes.formMainDiv}>
                            <TextField variant="outlined" name="name" value={userDetails?.name.value} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Username</Typography>
                        </Box>
                        <Box className={classes.formMainDiv}>
                            <TextField variant="outlined" name="username" value={userDetails?.username.value} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Bio</Typography>
                        </Box>
                        <Box className={classes.formMainDiv}>
                            <TextField variant="outlined" name="bio" value={userDetails?.bio.value} multiline rows={4} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Email address</Typography>
                        </Box>
                        <Box className={classes.formMainDiv}>
                            <TextField variant="outlined" name="email" value={userDetails?.email.value} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Phone number</Typography>
                        </Box>
                        <Box className={classes.formMainDiv}>
                            <TextField variant="outlined" name="phoneNumber" value={userDetails?.phoneNumber.value} onChange={handleChange} />
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>Gender</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Gender"
                                        defaultValue={""}
                                        value={userDetails?.gender.value ? userDetails.gender.value : ""}
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                '& > *:nth-of-type(odd)': {

                                                    display: "none"
                                                }
                                            }
                                        }}
                                        name="gender"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Box justifyContent={"center"}>
                        <Button variant="contained"
                            sx={{ width: "unset !important" }}
                            disabled={enable ? true : false}
                            onClick={handleSubmit}
                        >Submit</Button>
                    </Box>
                </Box >
            </Box>
            <Box>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TextField variant='filled' type={'file'} onChange={(e: any) => setProfileImage(e.target.files[0])} />
                        <Button variant="contained" onClick={handleProfileChange}>Change Profile</Button>
                    </Box>

                </Modal>
            </Box>
        </Container >
    )
}
export default EditProfile;
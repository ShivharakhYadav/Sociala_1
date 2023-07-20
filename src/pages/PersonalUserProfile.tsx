import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container'
import { Avatar, Grid, Tab, Tabs, ImageList, ImageListItem } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import MoreIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { styled } from '@mui/material/styles';
// import { setToLocalStorage } from '../utilities/LocalStorageHandler';
// import localStorageKeys from '../utilities/LocalStorageKeys';
import providerActions from '../store/actions/provider/actions';
import { getSingleUserRequest } from '../Api Services/AccountServices';
// import { getRequest } from '../services/Services';
// import { singleRecordURL } from '../services/Links';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    profileContainer: {
        width: "150px",
        height: "150px",
    },
    avatar: {
        height: "100% !important",
        width: "100% !important",
    },
    indicatorStyle: {
        // marginLeft: "-102px !important",
        // '& .MuiTabs-flexContainer': {
        //     '& >*':
        //     {
        //         justifyContent: "unset !important",
        //         padding: "0px !important",
        //     }
        // },
        // '& .MuiTabs-indicator': {
        //     width: "80px !important",
        //     // left: "392.962px !important"
        // },
    },
    tabs: {

    }
})

const Typography = styled('h3')(({ theme }) => ({
    [theme.breakpoints.up('xs')]: {
        fontSize: "25px",
        background: "red",
        letterSpacing: "1.5px"
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: "27px",
        background: "red",
        letterSpacing: "2px"
    },
})
);

function PersonalUserProfile(props: any) {
    let classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchedUserDetails, setSingleUserDetails] = useState<any>();
    let { username } = useParams();
    const [value, setValue] = useState(0);
    const userDetails = useSelector((state: any) => state?.providerReducer?.user);
    console.log("--userDetails", userDetails);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };
    const [followStateMessage, setFollowStateMessage] = useState("Follow");
    useEffect(() => {
        console.log('----usrname----', username);
        (async function () {
            let res = await getSingleUserRequest(username as any);
            const { success, data } = res as any;
            console.log(data);
            if (success) {
                setSingleUserDetails(data);
                let available = data.pendingRequest.filter((item: any) => item._id === userDetails._id);

                console.log("Requested Status", available)
                if (available.length > 0) {
                    setFollowStateMessage("Requested")
                }
                else {
                    let checkInFollowers = data.followers.filter((ids: any) => ids === userDetails._id);
                    console.log("Unfollow Status", checkInFollowers,);
                    if (checkInFollowers.length > 0) {
                        setFollowStateMessage("Unfollow");
                    }
                    else {
                        console.log("data.followings", data.followings);
                        let fol = data.followings.filter((ids: any) => ids === userDetails._id);
                        console.log("Follow Back Status", fol);
                        if (fol.length > 0) {
                            setFollowStateMessage("Follow Back")
                        }
                        else {
                            setFollowStateMessage("Follow");
                        }
                    }
                }
            }
            else {
                setSingleUserDetails("");
                navigate(`/${username}`)
            }
        })();
        //eslint-disable-next-line
    }, [username, userDetails])

    const requestedToFollow = (e: any) => {
        const title = e.target.title;
        console.log("Title---", title);
        if (title === "Follow" || title === "Follow Back") {
            try {
                let requester = userDetails;
                let accepter = searchedUserDetails;
                let body = {
                    requester: requester,
                    accepter: accepter,
                    type: 'RequestedToFollow'
                }
                fetch('http://localhost:4100/account/requestedToFollow', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then((response) => {
                    response.json().then((result) => {
                        if (result.success) {
                            setFollowStateMessage("Requested")
                        }
                        //searchedUserDetails.pendingRequest.push(userDetails);
                    })
                })
            }
            catch (err) {
                console.log("Err", err);
            }
        }

        if (title === "Unfollow") {
            let body = {
                requester_id: userDetails._id,
                idToDelete: searchedUserDetails._id
            };
            fetch("http://localhost:4100/account/unfollow",
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }).then((response) => {
                    response.json().then((result) => {
                        console.log(result, "unfoe")
                        getSingleUserRequest(userDetails.username as string).then((result: any) => {
                            // setToLocalStorage(localStorageKeys.USER_DETAILS, result.data);
                            dispatch(providerActions.save_user(result.data));
                        })
                    })
                });
        }
    }

    const handleConfirmFolllowRequest = async () => {
        let available = userDetails?.pendingRequest?.filter((item: any) => item.username === username);
        let body = {
            acceptedId: userDetails._id,
            requestedId: searchedUserDetails._id,
            pendingRequestId: available[0]._id,
            notificationBody: {
                _id: userDetails._id,
                username: userDetails.username,
            }
        }

        let response = await fetch('http://localhost:4100/account/requestAccept', {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "accept": "*"
            },
            body: JSON.stringify(body)
        });
        let result: any = await response.json();
        if (result.success) {
            setFollowStateMessage("FollowBack");
            // let url = `${singleRecordURL}${userDetails.username}`;
            getSingleUserRequest(userDetails.username as string).then((result: any) => {
                // setToLocalStorage(localStorageKeys.USER_DETAILS, result.data);
                dispatch(providerActions.save_user(result.data));
            })
        }
    }

    return (
        <>
            {
                searchedUserDetails ? <Container sx={{ background: "red" }} >
                    <Grid container bgcolor={"aqua"} >
                        {/* <Grid item xl={5} md={12} sm={12} bgcolor={"gainsboro"} m="auto"> */}
                        {
                            userDetails?.pendingRequest?.length > 0 && userDetails?.pendingRequest?.
                                filter((item: any) => item.username === username)
                                .map((it: any, i: any) => {
                                    return <Grid item key={`${it.username}${i}00`} xl={5} md={12} sm={12} bgcolor={"gainsboro"} m="auto">
                                        <Box key={`${it.usernama}${i}00`} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <Box>
                                                <Typography>
                                                    {username} wants to follow you
                                                </Typography>
                                            </Box>
                                            <Box sx={{ backgroundColor: "goldenrod", display: "flex", justifyContent: "space-around", width: "70%" }}>
                                                <Button variant='contained' onClick={handleConfirmFolllowRequest}>Confirm</Button>
                                                <Button variant='contained'>Delete</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                })
                        }
                        {/* </Grid> */}
                        <Grid item xl={12} md={12} sm={12} xs={12} bgcolor={"gray"} >
                            <Grid container bgcolor={"teal"}
                                justifyContent="center"
                            >
                                <Grid item xl={3} sm={3} xs={3} bgcolor={"sandybrown"}
                                    display="flex" justifyContent={"center"} alignItems="center"
                                >
                                    <Box bgcolor={"pink"} className={classes.profileContainer}>
                                        {
                                            searchedUserDetails.profileimg ?
                                                <Avatar className={classes.avatar} title={searchedUserDetails.username} alt={searchedUserDetails.username} src={searchedUserDetails.profileimg} />
                                                :
                                                <Avatar className={classes.avatar} title={searchedUserDetails.username} alt={searchedUserDetails.username}>{searchedUserDetails.username}</Avatar>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xl={6} lg={6} md={8} sm={9} xs={9} bgcolor={"greenyellow"}>
                                    <Box sx={{ height: "50px !important", background: "brown", display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                        <Box>
                                            <Typography >{searchedUserDetails?.username}</Typography>
                                        </Box>
                                        <Box>
                                            <Button variant='contained' sx={{ width: "100px", height: "35px" }} title={followStateMessage} onClick={requestedToFollow} disabled={followStateMessage === "Requested" ? true : false}>
                                                {followStateMessage}
                                            </Button>
                                        </Box>
                                        <Box bgcolor={"red"}>
                                            <MoreIcon sx={{ transform: "rotate(90deg)" }} />
                                        </Box>
                                    </Box>
                                    <Box bgcolor={'green'} display={'flex'} justifyContent="space-between">

                                        <Button variant='contained'>{searchedUserDetails?.post?.length > 0 ? searchedUserDetails?.post.length : 0} Posts</Button>
                                        <Button variant='contained'>{searchedUserDetails?.followers?.length ? searchedUserDetails?.followers?.length : 0} Followers</Button>
                                        <Button variant='contained'>{searchedUserDetails?.followings?.length ? searchedUserDetails?.followings?.length : 0} Followings</Button>
                                    </Box>
                                    <Box>
                                        <Typography >{searchedUserDetails?.name}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography>{searchedUserDetails?.bio}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid item xl={12}>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: "hidden" }}>
                                    <Tabs value={value} onChange={handleChange}
                                        className={classes.indicatorStyle}
                                        centered aria-label="basic tabs example">
                                        <Tab label="Posts" {...a11yProps(0)} icon={<ImageIcon sx={{}} />} iconPosition={"start"} />
                                        <Tab label="Saved" {...a11yProps(1)} icon={<BookmarkBorderIcon sx={{ marginRight: "2px !important" }} />} iconPosition="start" />
                                        <Tab label="Tagged" {...a11yProps(2)} icon={<AccountBoxOutlinedIcon sx={{ marginRight: "2px !important" }} />} iconPosition="start" />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <Box>
                                        {
                                            searchedUserDetails?.post?.length > 0 ? <Grid rowGap={2} columnSpacing={1} sx={{ background: "tomato" }} container xl={12} >
                                                {
                                                    searchedUserDetails.post.map((post: any, i: any) => {
                                                        return <Grid item xs={12} sm={6} md={4} xl={4} key={`${i + 1}`}>
                                                            <img
                                                                className="gridImage"
                                                                alt={post.postLink.split("-")[3]} src={post.postLink} />
                                                        </Grid>
                                                    })
                                                }
                                            </Grid> : <h1>No Post Availble</h1>
                                        }
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Box>
                                        <ImageList cols={3} >
                                            {
                                                searchedUserDetails?.saved?.length > 0 ?
                                                    searchedUserDetails.saved.map((post: any, i: any) => {
                                                        return <ImageListItem key={`${i + 1}`}>
                                                            <img
                                                                style={{ height: "270px", }}
                                                                alt={post.postLink.split("-")[3]} src={post.postLink} />
                                                        </ImageListItem>
                                                    })
                                                    : <h1>No Saved Post Availble</h1>
                                            }
                                        </ImageList>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Box>
                                        <ImageList cols={3} >
                                            {
                                                searchedUserDetails?.tagged?.length > 0 ?
                                                    searchedUserDetails.tagged.map((post: any, i: any) => {
                                                        return <ImageListItem key={`${i + 1}`}>
                                                            <img
                                                                style={{ height: "270px", }}
                                                                alt={post.postLink.split("-")[3]} src={post.postLink} />
                                                        </ImageListItem>
                                                    })
                                                    : <h1>No Tagged Post Availble</h1>
                                            }
                                        </ImageList>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Grid>
                    </Grid>
                </Container> : <h1>User Not Found</h1>
            }
        </>
    )
}
export default PersonalUserProfile;
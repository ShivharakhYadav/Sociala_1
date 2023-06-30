import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container'
import { Grid, Stack, Tab, Tabs } from '@mui/material'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getLocalStorageData, setToLocalStorage } from '../../utilities/LocalStorageHandler';
// import localStorageKeys from '../../utilities/LocalStorageKeys';
// import providerActions from '../../store/actions/provider/actions';
// import { getRequest, postRequest } from '../../services/Services';
// import { singleRecordURL } from '../../services/Links';
// import Followers_Following_Modal from '../../Components/Followers_Following_Modal';
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
                <Box sx={{ p: 3 }}>
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

function Userprofile() {
    let dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [modalData, setModalData] = useState({ open: false, data: "" });
    const userDetails = useSelector((state: any) => state?.providerReducer?.user)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const getPropsFromChild = () => {
        setModalData({ open: false, data: "" })
    }
    const handleModalData = (e: any) => {
        let title = e.target.title;
        setModalData({ open: true, data: userDetails[title] })
    }

    useEffect(() => {
        // (
        //     async function () {
        //         if (!userDetails._id) {
        //             let data: any = getLocalStorageData(localStorageKeys.USER_DETAILS);
        //             let result = await getRequest(`${singleRecordURL}${data.username}`);

        //             if (result.success) {
        //                 setToLocalStorage(localStorageKeys.USER_DETAILS, result.data)
        //                 dispatch(providerActions.save_user(result.data))
        //             }
        //         }
        //     }
        // )()
        //eslint-disable-next-line
    }, [])
    return (
        <Container maxWidth='md'>
            <Grid container>
                <Grid item md={12}>
                    <Box>
                        <Box style={{ backgroundColor: 'yellow' }}>
                            <Box display='flex' justifyContent='space-evenly'>
                                <Box>
                                    <img src="bird.jpg" alt="profile pic" style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
                                </Box>
                                <Box>
                                    <Typography variant='h3'>{userDetails?.username}</Typography>
                                    <Button variant='contained'>
                                        <Link to="/accounts/edit" state={userDetails}>Edit Profiles</Link>
                                    </Button>
                                </Box>
                            </Box>
                            <Box bgcolor={'green'} display={'flex'} justifyContent="space-around">
                                <Button variant='contained'>{0} {userDetails?.name}</Button>
                                <Button variant='contained' title='followers' onClick={handleModalData}>{userDetails?.followers?.length} followers</Button>
                                <Button variant='contained' title='followings' onClick={handleModalData}>{userDetails?.followings?.length} followings</Button>
                            </Box>
                            <Box bgcolor='pink'>
                                <Typography variant='h3'>{userDetails?.name}</Typography>
                                <Typography variant='h3'>Bio</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                                    <Tab label="Posts" {...a11yProps(0)} />
                                    <Tab label="Saved" {...a11yProps(1)} />
                                    <Tab label="Tagged" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Box>
                                    <Stack direction={'row'} spacing={2}>
                                        {
                                            userDetails?.post?.length > 0 ? userDetails.post.map((post: any, i: any) => {
                                                return <div style={{ borderRadius: '10px', border: '2px solid black' }} key={`${i}`}>
                                                    <img style={{ height: "100px", width: "100px", borderRadius: 'inherit' }} key={`${i + 1}`} alt={post.postLink.split("-")[3]} src={post.postLink} />
                                                </div>
                                            }) : <h1>No Posts</h1>
                                        }

                                    </Stack>
                                </Box>

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* {modalData.open && <Followers_Following_Modal data={modalData} close={getPropsFromChild} />} */}
        </Container >
    )
}
export default Userprofile;
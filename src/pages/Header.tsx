import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Typography, AppBar, Toolbar, Box, TextField, IconButton, InputAdornment, Tooltip, Avatar, Menu, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@mui/styles';
import EditProfile from './Profiles/EditProfile';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateTypes } from '../Types/types';
import LoopIcon from '@mui/icons-material/Loop';
import providerActions from '../store/actions/provider/actions';
import { searchUserRequest } from '../Api Services/AccountServices';
const settings = ['Profile', 'New Post', 'Dashboard', 'Logout'];

const styles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            borderRadius: "30px !important",
            background: "#eee"
        }
    }
})


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    border: "2px solid black",
    color: "black",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const test = styles();
    const user = useSelector((state: stateTypes) => state?.providerReducer?.user);
    const [show, setShow] = useState(false);
    const [result, setResult] = useState([]);
    const [searched, setSearched] = useState("");
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [NotificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
    const isNotificationMenuOpen = Boolean(NotificationAnchor);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e: any) => {
        console.log("e.target", e.target)
        setAnchorElUser(null);
    };

    const handleMenuItem = (e: any) => {
        // console.log()
        const title = e.target.title;

        console.log("title", title);
        if (title == "Profile") {
            console.log(user)
            console.log(user.username)
            navigate(`/${user.username}`);
            setAnchorElUser(null);

        }

        if (title == "Dashboard") {
            navigate("/");
        }

        if (title == "Logout") {
            dispatch(providerActions.save_user({}));
            localStorage.clear();
            setAnchorElUser(null);
        }

        if (title == 'New Post') {
            navigate("/post");
        }
    }

    const handleNotification = async (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchor(event.currentTarget);
        // const ids = userDetails?.notification.filter((item: any) => !item.readed).map((item: any) => { return item.notificationId })
        // if (ids.length > 0) {
        //     let result = await postRequest(`${notificationURL}${userDetails._id}`, "", { notification_ids: ids })
        // }
    }

    const searchuser = async (e: any) => {
        try {
            setSearched(e.target.value);
            if (e.target.value.length > 0) {
                const result = await searchUserRequest(e.target.value);
                console.log("search result ---", result);
                setResult(result);
            }
        }
        catch (err) { console.log(err) }
    }

    const notificationId = 'notification-of-current-user';
    const renderNotification = (
        <Menu
            anchorEl={NotificationAnchor}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={notificationId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isNotificationMenuOpen}
            onClose={() => setNotificationAnchor(null)}
        >
            {
                user?.notifications?.length > 0 && user?.notifications.map((item: any, i: any) => {
                    if (item.type === "RequestedToFollow") {
                        return <MenuItem
                            title={`${item.type}${Date.now()}`}
                            key={`${item.type}${i}`}
                            onClick={() => { setNotificationAnchor(null); navigate(`/${item.requester.username}`, { state: item.requester }) }}
                        >{`${item.requester.username} wants to follow you`}</MenuItem>
                    }
                    if (item.type === "followRequestedAccepted") {
                        return <MenuItem
                            title={`${item.type}${Date.now()}`}
                            key={`${item.type}${i}`}
                            onClick={() => { setNotificationAnchor(null); navigate(`/${item.requester.username}`, { state: item.requester }) }}
                        >
                            {`${item.requester.username} started following you.`}
                        </MenuItem>
                    }
                    return null;
                })
            }
        </Menu>);

    return (
        <>
            <AppBar sx={{ backgroundColor: "white", }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h3" color={"black"}>Logo</Typography>
                    {/* <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment >
                        )
                    }}
                    placeholder='Search'
                    value=""
                    className={test.root}
                /> */}
                    <Box>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={searchuser}
                                value={searched}
                                onFocus={() => { setShow(true) }}
                            // onBlur={() => { setShow(false) }}
                            />
                        </Search>

                        {
                            show && <Paper sx={{ height: '300px', width: 'inherit', position: 'absolute', top: '55px', left: '100px', zIndex: "1" }}>
                                {
                                    result.length > 0 ?
                                        <>
                                            {result.map((item: any, i) => {
                                                return <div key={`${item._id}`}>
                                                    <Link
                                                        to={`/${item.username}`}
                                                        onClick={() => { setSearched(""); setShow(false) }}
                                                        state={item}
                                                    >{item.username}</Link>
                                                </div>
                                            })}
                                        </> :
                                        <LoopIcon className="loop" sx={{ position: 'absolute', left: '50%', top: "50%", trransform: "translate(-50%, -50%)" }} />
                                }
                            </Paper>
                        }
                    </Box>
                    <Box sx={{ width: "17%", display: "flex", justifyContent: "space-between" }}>
                        <IconButton sx={{ backgroundColor: "currentcolor" }}>
                            <HomeIcon />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: "currentcolor" }}>
                            <BoltIcon />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: "currentcolor" }}
                            size="large"
                            aria-label="show 17 new notifications"
                            aria-controls={notificationId}
                            aria-haspopup="true"
                            onClick={handleNotification}
                        // color="inherit"
                        >
                            <Badge badgeContent={user?.notifications?.filter((item: any) => !item.readed).length} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Shiv" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleMenuItem} >
                                    <Typography textAlign="center" title={setting}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar >
            {renderNotification}
        </>
    )
}

export default Header;


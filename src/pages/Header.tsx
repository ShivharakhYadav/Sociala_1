import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Paper, Typography, AppBar, Toolbar, Box, TextField, IconButton, InputAdornment, Tooltip, Avatar, Menu, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
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

    return (
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
                        edge="end">
                        <ChatBubbleOutlineOutlinedIcon />
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
    )
}

export default Header;
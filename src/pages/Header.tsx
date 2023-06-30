import { useState } from 'react'
import { Typography, AppBar, Toolbar, Box, TextField, IconButton, InputAdornment, Tooltip, Avatar, Menu, MenuItem } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import { makeStyles } from '@mui/styles';
import EditProfile from './Profiles/EditProfile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateTypes } from '../Types/types';
import providerActions from '../store/actions/provider/actions';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const styles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            borderRadius: "30px !important",
            background: "#eee"
        }
    }
})

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: stateTypes) => state?.providerReducer?.user);
    console.log("yser----", user)
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
        const title = e.target.title;;

        console.log("title", title);
        if (title == "Profile") {
            console.log(user)
            console.log(user.username)
            navigate(`/${user.username}`);
            setAnchorElUser(null);

        }

        if (title == "Logout") {
            dispatch(providerActions.save_user({}));
            localStorage.clear();
            setAnchorElUser(null);
        }
    }
    const test = styles();
    return (
        <AppBar sx={{ backgroundColor: "white", }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h3" color={"black"}>Logo</Typography>
                <TextField
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
                />
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
        </AppBar>
    )
}

export default Header;
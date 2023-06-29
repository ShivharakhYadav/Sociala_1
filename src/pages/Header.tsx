import { Typography, AppBar, Toolbar, Box, TextField, IconButton, InputAdornment } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { makeStyles } from '@mui/styles';

const styles = makeStyles({
    root: {
        '& .MuiInputBase-root': {
            borderRadius: "30px !important",
            background: "#eee"
        }
    }
})

function Header() {
    const test = styles();
    return (
        <AppBar sx={{ backgroundColor: "white" }}>
            <Toolbar>
                <Typography variant="h3" width={"280px"} color={"black"}>Logo</Typography>
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
                <Box display="flex" flexGrow={1}>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsActiveOutlinedIcon />
                    </IconButton>
                    <IconButton
                        edge="end">
                        <ChatBubbleOutlineOutlinedIcon />
                    </IconButton>
                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default Header;
import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {Avatar, Box} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        setAnchorEl(null);
        await dispatch(logoutUser());
    };

    return (
        <Box>
            <Box display='flex' alignItems='center'>
                {
                    user.avatarImage ? (
                        <Avatar
                            alt={user.displayName}
                            src={user.avatarImage}
                        />
                    ): <AccountCircleIcon/>
                }
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{color: "inherit"}}
                >
                    {user.displayName}
                </Button>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/track_history">Track History</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add_artist">Add Artist</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add_album">Add Album</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/add_track">Add Track</MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to="/">Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";
import Spinner from "../Spinner/Spinner";


const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const logoutLoading = useSelector(state => state.users.logoutLoading);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{backgroundColor: '#3f51b5'}}>
                    <ToastContainer/>
                    <Toolbar>
                        <Typography variant='h6' sx={{textDecoration: 'none', color: 'white', flexGrow: 1}} component={Link} to="/">
                            Music FM
                        </Typography>
                        {user ? <UserMenu user={user} />: <Anonymous/>}
                    </Toolbar>
                </AppBar>
                <Toolbar/>
            </Box>
            {logoutLoading && <Spinner/>}
        </>
    );
};

export default AppToolbar;
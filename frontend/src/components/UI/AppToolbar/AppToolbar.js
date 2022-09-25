import React from 'react';
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";


const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    return (
        <>
            <AppBar position="fixed" sx={{backgroundColor: '#3f51b5'}}>
                <ToastContainer />
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant='h6' sx={{textDecoration: 'none', color: 'white'}} component={Link} to="/">
                                Music FM
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? <Button component={Link} to='/track_history' color='inherit'>Track History</Button>:
                                (
                                    <>
                                        <Button component={Link} to="/register" color="inherit">
                                            Sign Up
                                        </Button>
                                        <Button component={Link} to="/login" color="inherit">
                                            Sign In
                                        </Button>
                                    </>
                                )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

export default AppToolbar;
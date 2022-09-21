import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const AppToolbar = () => {
    return (
        <>
            <AppBar position="fixed" sx={{backgroundColor: '#3f51b5'}}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Typography variant='h6' sx={{textDecoration: 'none', color: 'white'}} component={Link} to="/">
                                Music FM
                            </Typography>
                        </Typography>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

export default AppToolbar;
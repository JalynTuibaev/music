import React from 'react';
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Anonymous = () => {
    return (
        <>
            <Typography component="div" sx={{ flexGrow: 0 }}>
                <Button component={Link} to='/register' sx={{color: 'white'}}>Sign Up</Button>
                <Button component={Link} to='/login' sx={{color: 'white'}}>Sign In</Button>
            </Typography>
        </>
    );
};

export default Anonymous;
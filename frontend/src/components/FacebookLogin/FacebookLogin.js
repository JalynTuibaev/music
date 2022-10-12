import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {facebookAppId} from "../../config";
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button} from "@mui/material";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        console.log(response);
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
            render={props => (
                <Button
                    fullWidth
                    color='primary'
                    variant='outlined'
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;
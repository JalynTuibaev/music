import React, {useEffect, useState} from 'react';
import {Alert, Avatar, Container, Grid, Link, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {clearLoginErrors, loginUser} from "../../store/actions/usersActions";
import {Link as RouterLink} from "react-router-dom";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '3px solid #1976d2',
        padding: '15px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.secondary.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
}))

const Login = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        return () => {
            dispatch(clearLoginErrors());
        };
    }, [dispatch]);

    const onInputChange = (e) => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const onSubmitForm = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };


    return (
        <Container maxWidth='xs' >
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>
                    Sign in
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Error! {error.message}
                    </Alert>
                )}

                <Grid
                    component='form'
                    className={classes.form}
                    onSubmit={onSubmitForm}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <FormElement
                        onChange={onInputChange}
                        name="username"
                        label="Username"
                        value={user.username}
                        required={true}
                    />
                    <FormElement
                        onChange={onInputChange}
                        name="password"
                        label="Password"
                        value={user.password}
                        type='password'
                        required={true}
                    />
                    <LoadingButton
                        sx={{width: '80%', margin: '10px auto'}}
                        component="button"
                        type='submit'
                        loading={loading}
                        variant="contained"
                    >
                        Sign in
                    </LoadingButton>
                </Grid>

                <Grid container justifyContent="flex-end" marginRight='20px'>
                    <Grid item>
                        <Link component={RouterLink} to="/register">
                            Or sign up
                        </Link>
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
};

export default Login;
import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import {Alert, Avatar, Container, Grid, Link, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '3px solid #1976d2',
        padding: '10px'
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


const Register = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    const [user, setUser] = useState({
        email: '',
        displayName: '',
        avatarImage: '',
        password: ''
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        };
    }, [dispatch]);

    const onInputChange = (e) => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const onSubmitForm = e => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

    return (
        <Container maxWidth='xs'>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>
                    Sign up
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.avatar}>
                        Error! {error.errors.username.message}
                    </Alert>
                )}

                <Grid
                    component='form'
                    onSubmit={onSubmitForm}
                    container
                    spacing={2}
                    padding={2}
                >
                    <FormElement
                        onChange={onInputChange}
                        name="email"
                        label="Email"
                        value={user.email}
                        required={true}
                    />
                    <FormElement
                        onChange={onInputChange}
                        name="displayName"
                        label="Display Name"
                        value={user.displayName}
                        required={true}
                    />
                    <FormElement
                        onChange={onInputChange}
                        name="avatarImage"
                        label="Avatar"
                        value={user.avatarImage}
                    />
                    <FormElement
                        onChange={onInputChange}
                        name="password"
                        label="Password"
                        value={user.password}
                        type='password'
                        required={true}
                    />

                    <Grid item xs={12}>
                        <LoadingButton
                            fullWidth
                            component="button"
                            type='submit'
                            loading={loading}
                            variant="contained"
                        >
                            Sign up
                        </LoadingButton>
                    </Grid>

                    <Grid item xs={12}>
                        <FacebookLogin/>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end" marginTop='10px'>
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;
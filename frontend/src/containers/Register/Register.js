import React, {useEffect, useState} from 'react';
import {Avatar, Container, Grid, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {makeStyles} from "tss-react/mui";
import {useDispatch, useSelector} from "react-redux";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";

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


const Register = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);
    const [user, setUser] = useState({
        username: '',
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

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth='xs' >
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant='h5'>
                    Sign up
                </Typography>
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
                        error={getFieldError('username')}
                    />
                    <FormElement
                        onChange={onInputChange}
                        name="password"
                        label="Password"
                        value={user.password}
                        error={getFieldError('password')}
                        type='password'
                    />
                    <LoadingButton
                        sx={{width: '80%', margin: '10px auto'}}
                        component="button"
                        type='submit'
                        loading={loading}
                        variant="contained"
                    >
                        Sign up
                    </LoadingButton>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;
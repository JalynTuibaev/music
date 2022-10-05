import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, Typography} from "@mui/material";
import {Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {addArtist} from "../../store/actions/artistsActions";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import Spinner from "../../components/UI/Spinner/Spinner";

const AddArtist = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.users.user);
    const error = useSelector(state => state.artists.addError);
    const loading = useSelector(state => state.artists.addLoading);

    const [artist, setArtist] = useState({
        name: '',
        info: '',
        image: '',
    });

    if (!user) {
        toast.warn('You need login!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return <Redirect to="/login"/>
    }

    const submitFormHandler = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(artist).forEach(key => {
            formData.append(key, artist[key]);
        });

        await dispatch(addArtist(formData));
        history.push('/');
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setArtist(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setArtist(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    let render = (
        <form onSubmit={submitFormHandler}>
            <Typography variant='h5'>
                Add Artist
            </Typography>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <FormElement
                        onChange={inputChangeHandler}
                        name='name'
                        label='Artist'
                        value={artist.name}
                        required={true}
                        error={getFieldError('name')}
                    />
                </Grid>
                <Grid item>
                    <FormElement
                        onChange={inputChangeHandler}
                        name='info'
                        label='Artist information'
                        value={artist.info}
                    />
                </Grid>
                <Grid item>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileChangeHandler}
                    />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained">Add Artist</Button>
                </Grid>
            </Grid>
        </form>
    );

    if (loading) {
        render = <Spinner/>
    }

    return (
        <>
            {render}
        </>
    );
};

export default AddArtist;
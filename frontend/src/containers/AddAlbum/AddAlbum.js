import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Grid, Typography} from "@mui/material";
import {Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import Spinner from "../../components/UI/Spinner/Spinner";
import {addAlbum, clearAddAlbumError} from "../../store/actions/albumsActions";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import {getArtists} from "../../store/actions/artistsActions";

const AddAlbum = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.users.user);
    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.albums.addError);
    const loading = useSelector(state => state.albums.addLoading);

    const [album, setAlbum] = useState({
        name: '',
        artist: '',
        release: '',
        image: '',
    });

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearAddAlbumError());
        }
    }, [dispatch]);

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

        Object.keys(album).forEach(key => {
            formData.append(key, album[key]);
        });

        await dispatch(addAlbum(formData));
        history.push('/');
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setAlbum(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setAlbum(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    let render = (
        <form onSubmit={submitFormHandler}>
            <Typography variant='h5'>
                Add Album
            </Typography>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <FormElement
                        onChange={inputChangeHandler}
                        name='name'
                        label='Album'
                        value={album.name}
                        required={true}
                        error={getFieldError('name')}
                    />
                </Grid>

                <Grid item>
                    <FormSelect
                        onChange={inputChangeHandler}
                        name='artist'
                        options={artists ? artists: []}
                        label='Artist'
                        value={album.artist}
                        error={getFieldError('artist')}
                    />
                </Grid>

                <Grid item>
                    <FormElement
                        type='date'
                        required={true}
                        onChange={inputChangeHandler}
                        name='release'
                        label=''
                        value={album.release}
                        error={getFieldError('release')}
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
                    <Button type="submit" variant="contained">Add Album</Button>
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

export default AddAlbum;
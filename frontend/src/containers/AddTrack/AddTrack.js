import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {addTrack, clearAddTrackError} from "../../store/actions/tracksActions";
import {Button, Grid, Typography} from "@mui/material";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import FormSelect from "../../components/UI/Form/FormSelect/FormSelect";
import Spinner from "../../components/UI/Spinner/Spinner";
import {getAlbums} from "../../store/actions/albumsActions";

const AddTrack = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.users.user);
    const albums = useSelector(state => state.albums.allAlbums);
    const error = useSelector(state => state.tracks.addError);
    const loading = useSelector(state => state.tracks.addLoading);

    const [track, setTrack] = useState({
        name: '',
        album: '',
        duration: '',
    });

    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearAddTrackError());
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

        await dispatch(addTrack(track));
        history.push('/');
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setTrack(prevState => {
            return {...prevState, [name]: value};
        });
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
            <Typography variant='h5' paddingY='20px'>
                Add Track
            </Typography>
            <Grid container direction='column' rowSpacing={2}>
                <Grid item>
                    <FormElement
                        onChange={inputChangeHandler}
                        name='name'
                        label='Track'
                        value={track.name}
                        required={true}
                        error={getFieldError('name')}
                    />
                </Grid>

                <Grid item>
                    <FormSelect
                        required={true}
                        onChange={inputChangeHandler}
                        name='album'
                        options={albums ? albums: []}
                        label='Album'
                        value={track.album}
                        error={getFieldError('album')}
                    />
                </Grid>

                <Grid item>
                    <FormElement
                        onChange={inputChangeHandler}
                        name='duration'
                        label='Duration'
                        value={track.duration}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" variant="contained">Add Track</Button>
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

export default AddTrack;
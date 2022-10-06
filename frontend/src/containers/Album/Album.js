import React, {useEffect} from 'react';
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CardActionArea, CardActions, CardContent, Typography} from "@mui/material";
import {deleteTrack, getTracks, publishTrack} from "../../store/actions/tracksActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {addTrackHistory} from "../../store/actions/trackHistoriesActions";

const Album = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const user = useSelector(state => state.users.user);
    const tracks = useSelector(state => state.tracks.tracks);
    const loading = useSelector(state => state.tracks.loading);
    const addLoading = useSelector(state => state.trackHistories.addLoading);
    const publishLoading = useSelector(state => state.tracks.publishLoading);
    const deleteLoading = useSelector(state => state.tracks.deleteLoading);

    useEffect(() => {
        dispatch(getTracks(match.params.id));
    }, [dispatch, match.params.id]);


    const onClickTrack = (id) => {
        dispatch(addTrackHistory(id));
    };



    let render = (
        <>
            {tracks[0] ?
                (<>
                    <Typography variant='h4' padding='5px'>
                        Певец: {tracks[0].album.artist.name}
                    </Typography>
                    <Typography variant='h4' padding='5px'>
                        Альбом: {tracks[0].album.name}
                    </Typography>
                </>): null
            }
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {tracks.map(track => track.published && (
                    <Card sx={{ width: 350, margin: '10px' }} key={track._id}>
                        <CardActionArea onClick={() => onClickTrack(track._id)}>
                            <CardContent>
                                <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h6" component="div">
                                    №{track.number} Название: {track.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Продолжительность: {track.duration}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );

    if (user && user.role === 'admin') {
        render = (
            <>
                {tracks[0] ?
                    (<>
                        <Typography variant='h4' padding='5px'>
                            Певец: {tracks[0].album.artist.name}
                        </Typography>
                        <Typography variant='h4' padding='5px'>
                            Альбом: {tracks[0].album.name}
                        </Typography>
                    </>): null
                }
                <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                    {tracks.map(track => (
                        <Card sx={{ width: 350, margin: '10px' }} key={track._id}>
                            <CardActionArea onClick={() => onClickTrack(track._id)}>
                                <CardContent>
                                    <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h6" component="div">
                                        №{track.number} Название: {track.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Продолжительность: {track.duration}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {!track.published ?
                                    <Button size="small" variant='contained' onClick={() => dispatch(publishTrack(track._id))}>
                                        Publish
                                    </Button>: null}
                                <Button type='button' size="small" variant='contained' onClick={() => dispatch(deleteTrack(track._id))}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </>
        );
    }

    if (tracks.length === 0) {
        render = <h1>Tracks not found</h1>
    }

    if (loading || addLoading || publishLoading || deleteLoading) {
        render = <Spinner/>;
    }

    return (
        <>
            {render}
        </>
    );
};

export default Album;
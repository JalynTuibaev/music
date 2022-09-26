import React, {useEffect} from 'react';
import {useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {getTracks} from "../../store/actions/tracksActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {addTrackHistory} from "../../store/actions/trackHistoriesActions";

const Album = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const tracks = useSelector(state => state.tracks.tracks);
    const loading = useSelector(state => state.tracks.loading);

    useEffect(() => {
        dispatch(getTracks(match.params.id));
    }, [dispatch, match.params.id]);


    const onClickTrack = (id) => {
        dispatch(addTrackHistory(id));
    };



    let render = tracks && (
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
                    </Card>
                ))}
            </Box>
        </>
    );

    if (tracks && tracks.length === 0) {
        render = <h1>Tracks not found</h1>
    }

    if (loading) {
        render = <Spinner/>;
    }

    return (
        <>
            {render}
        </>
    );
};

export default Album;
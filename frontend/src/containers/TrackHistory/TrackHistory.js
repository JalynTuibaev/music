import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {getTrackHistory} from "../../store/actions/trackHistoriesActions";

const TrackHistory = () => {
    const dispatch = useDispatch();
    const trackHistory = useSelector(state => state.trackHistories.trackHistory);

    useEffect(() => {
        dispatch(getTrackHistory());
    }, [dispatch]);


    return trackHistory && (
        <>
            <Typography variant='h4'>
                Track History:
            </Typography>
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {trackHistory.map(history => (
                    <Card sx={{ width: 350, margin: '10px' }} key={history._id}>
                            <CardContent>
                                <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h5" component="div">
                                    Исполнитель: {history.track.album.artist.name}
                                </Typography>
                                <Typography variant="h6" component='div'>
                                     Трек: {history.track.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Дата: {history.datetime}
                                </Typography>
                            </CardContent>
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default TrackHistory;
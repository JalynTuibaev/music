import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getArtists} from "../../store/actions/artistsActions";
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";

const Artists = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const artists = useSelector(state => state.artists.artists);
    const loading = useSelector(state => state.artists.loading);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const onClickArtist = id => {
        history.push('/artists/' + id);
    };

    let render = artists && (
        <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
            {artists.map(artist => (
                <Card sx={{ width: 250, margin: '10px' }} key={artist._id}>
                    <CardActionArea onClick={() => onClickArtist(artist._id)}>
                        <CardMedia
                            component="img"
                            height="240"
                            image={artist.image ? `http://localhost:8000/uploads/${artist.image}`: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
                            alt={artist.name + ' image'}
                        />
                        <CardContent>
                            <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h6" component="div">
                                {artist.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );

    if (loading) {
        render = <Spinner/>;
    }


    return (
       <>
           {render}
       </>
    );
};

export default Artists;
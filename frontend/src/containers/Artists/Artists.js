import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {deleteArtist, getArtists, publishArtist} from "../../store/actions/artistsActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Artists = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.users.user);
    const artists = useSelector(state => state.artists.artists);
    const loading = useSelector(state => state.artists.loading);
    const publishLoading = useSelector(state => state.albums.publishLoading);
    const deleteLoading = useSelector(state => state.albums.deleteLoading);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const onClickArtist = id => {
        history.push('/artists/' + id);
    };

    let render = (
        <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
            {artists.map(artist => artist.published && (
                <Card sx={{ width: 250, margin: '10px' }} key={artist._id}>
                    <CardActionArea onClick={() => onClickArtist(artist._id)}>
                        <CardMedia
                            component="img"
                            height="240"
                            image={artist.image ? `http://localhost:8000/${artist.image}`: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
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

    if (user && user.role === 'admin') {
        render = (
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {artists.map(artist => (
                    <Card sx={{ width: 250, margin: '10px' }} key={artist._id}>
                        <CardActionArea onClick={() => onClickArtist(artist._id)}>
                            <CardMedia
                                component="img"
                                height="240"
                                image={artist.image ? `http://localhost:8000/${artist.image}`: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
                                alt={artist.name + ' image'}
                            />
                            <CardContent>
                                <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h6" component="div">
                                    {artist.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {!artist.published ?
                                <Button size="small" variant='contained' onClick={() => dispatch(publishArtist(artist._id))}>
                                    Publish
                                </Button>: null}
                            <Button type='button' size="small" variant='contained' onClick={() => dispatch(deleteArtist(artist._id))}>
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        );
    }

    if (loading || publishLoading || deleteLoading) {
        render = <Spinner/>;
    }


    return (
       <>
           {render}
       </>
    );
};

export default Artists;
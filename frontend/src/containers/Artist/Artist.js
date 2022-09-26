import React, {useEffect} from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {getArtistAlbums} from "../../store/actions/albumsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {currentArtist} from "../../store/actions/currentArtistActions";

const Artist = () => {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const history = useHistory();
    const albums = useSelector(state => state.albums.albums);
    const loading = useSelector(state => state.albums.loading);

    useEffect(() => {
        dispatch(getArtistAlbums(match.params.id));
    }, [dispatch, match.params.id]);

    const onClickAlbum = (id, name) => {
        dispatch(currentArtist(name));
        history.push(`/albums/${id}`);
    };

    let render = albums && (
        <>
            {albums[0] ?
                <Typography variant='h4' padding='5px'>
                    Певец: {albums[0].artist.name}
                </Typography>: null
            }
            <Box display='flex' flexWrap='wrap' justifyContent='flex-start'>
                {albums.map(album => (
                    <Card sx={{ width: 250, margin: '10px' }} key={album._id}>
                        <CardActionArea onClick={() => onClickAlbum(album._id, album.artist.name)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={album.image ? `http://localhost:8000/uploads/${album.image}`: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}
                                alt={album.name + ' image'}
                            />
                            <CardContent>
                                <Typography sx={{wordWrap: 'break-word'}} gutterBottom variant="h6" component="div">
                                    {album.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {album.release}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );

    if (albums && albums.length === 0) {
        render = <h1>Albums not found</h1>
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

export default Artist;
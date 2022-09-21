import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getArtists} from "../../store/actions/artistsActions";

const Artists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <div>

        </div>
    );
};

export default Artists;
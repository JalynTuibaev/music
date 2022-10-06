import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import AddArtist from "./containers/AddArtist/AddArtist";
import AddAlbum from "./containers/AddAlbum/AddAlbum";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artists" exact component={Artists}/>
                <Route path="/artists/:id" exact component={Artist}/>
                <Route path="/albums/:id" exact component={Album}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/track_history" exact component={TrackHistory}/>
                <Route path="/add_artist" exact component={AddArtist}/>
                <Route path="/add_album" exact component={AddAlbum}/>
            </Switch>
        </Layout>
    );
};

export default App;
import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artists" exact component={Artists}/>
                <Route path="/artists/:id" exact component={Artist}/>
                <Route path="/albums/:id" exact component={Album}/>
            </Switch>
        </Layout>
    );
};

export default App;
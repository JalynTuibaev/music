import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Artists from "./containers/Artists/Artists";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Artists}/>
                <Route path="/artists" exact component={Artists}/>
            </Switch>
        </Layout>
    );
};

export default App;
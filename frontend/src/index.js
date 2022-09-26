import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from "react-router-dom";
import artistsReducer from "./store/reducers/artistsReducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import albumsReducer from "./store/reducers/albumsReducer";
import tracksReducer from "./store/reducers/tracksReducer";
import App from './App';
import './index.css';
import usersReducer from "./store/reducers/usersReducer";
import history from "./history";
import trackHistoriesReducer from "./store/reducers/trackHistoriesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
    trackHistories: trackHistoriesReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);


const app = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
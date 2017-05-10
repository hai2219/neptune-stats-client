import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/app';
import './components/stylesheets/App.css';
import reducer from './reducers';
import PlayerStatsPageComponent from './components/statistics-player/statistics-player-page-component';

const store = createStore(reducer);
render(
    <PlayerStatsPageComponent canvas_param={canvas_param} />,
    document.getElementById('root')
);

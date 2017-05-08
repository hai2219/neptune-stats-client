import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import routes from './routes';
const appConfig = require('../config');

/* eslint-disable no-console */
const host = appConfig.LOCAL_URL.slice(-1) == ":" ? appConfig.LOCAL_URL.slice(0, -1) : appConfig.LOCAL_URL;
const port = appConfig.LOCAL_PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.use('/', routes());

app.get('/*', function (req, res) {
    if (req.params && req.params[0] == "redirect") {
        res.redirect(req.query.page + "&c=" + req.query.c+ "&a=" + req.query.a);
    } else {
        res.sendFile(path.join(__dirname, '../src/index.html'));
    }
});


app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`${host}:${port}`);
    }
});

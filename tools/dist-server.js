import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import open from 'open';
import compression from 'compression';
import routes from './routes';

const appConfig = require('../config');
const timeout = express.timeout;

app.use(timeout(360000));
/*eslint-disable no-console */

const host = appConfig.LOCAL_URL || 'http://localhost:';
const port = appConfig.LOCAL_PORT || 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
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
        open(`${host}${port}`);
    }
});

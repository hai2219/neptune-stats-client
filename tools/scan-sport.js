import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import routes from './routes';
const appConfig = require('../config');

/*eslint-disable no-console */

const host = appConfig.LOCAL_URL || 'http://localhost:';
const port = 3001;
const app = express();

app.use(compression());
app.use(express.static('tools'));

app.use('/', routes());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../tools/sport.html'));
});


app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`${host}${port}`);
    }
});

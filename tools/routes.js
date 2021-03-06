import express from "express";
import request from "request";
import http from "http";
import https from "https";
import path from 'path';
import crypto from "crypto";
const router = express.Router();
const appConfig = require('../config');
import * as env from '../env';
const baseUrl = appConfig.LOCAL_URL + ':' + appConfig.LOCAL_PORT;

const routes = () => {
    router.get('/api/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        let url = appConfig.SERVER_URL + '/' + req.params[0] + search;
        const options = {
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': appConfig.AUTHORIZATION,
                'x-api-key': appConfig.X_API_KEY,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        };

        function callback(error, response, body) {

            if (!error && (response.statusCode == 200 || response.statusCode == 404)) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/heroku/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';

        let url = appConfig.PLAYER_STAT_API_HEROKU_URL + '/' + req.params[0] + search;
        const options = {
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': appConfig.AUTHORIZATION,
                'x-api-key': appConfig.X_API_KEY,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        };

        function callback(error, response, body) {

            if (!error && (response.statusCode == 200 || response.statusCode == 404)) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/playerstart/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';

        let url = appConfig.PLAYER_STAT_API_HOST + ':' + appConfig.PLAYER_STAT_API_PORT + '/' + req.params[0] + search;
        const options = {
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': appConfig.AUTHORIZATION,
                'x-api-key': appConfig.X_API_KEY,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        };

        function callback(error, response, body) {

            if (!error && (response.statusCode == 200 || response.statusCode == 404)) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });


    router.post('/playerstart/post/*', function (req, res) {
        let _http = http;
        if (appConfig.PLAYER_STAT_API_SSL) {
            _http = https;
        }
        try {
            let post_options = {
                host: appConfig.PLAYER_STAT_API_HOST,
                port: appConfig.PLAYER_STAT_API_PORT,
                path: '/' + req.params[0],
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Set up the request
            let post_req = _http.request(post_options, function (response) {
                let data = "";
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    res.send(data);
                }).on('error', function (e) {
                    res.send(e);
                });
            });
            // post the data
            post_req.write(JSON.stringify(req.body));
            post_req.on('error', function (e) {
                res.send(e);
            });
            post_req.end();
        } catch (e) {
            res.send(e);
        }
    });




    router.post('/heroku/post/*', function (req, res) {
        let _http = http;
        if (appConfig.PLAYER_STAT_API_SSL) {
            _http = https;
        }
        try {
            let post_options = {
                host: appConfig.PLAYER_STAT_API_HEROKU_HOST,
                port: appConfig.PLAYER_STAT_API_HEROKU_PORT,
                path: '/' + req.params[0],
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                }
            };

            // Set up the request
            let post_req = _http.request(post_options, function (response) {
                let data = "";
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    res.send(data);
                }).on('error', function (e) {
                    res.send(e);
                });
            });
            // post the data
            post_req.write(JSON.stringify(req.body));
            post_req.on('error', function (e) {
                res.send(e);
            });
            post_req.end();
        } catch (e) {
            res.send(e);
        }
    });


    router.post('/statistics', function (req, res) {
        let authenticate = false;
        let envelope = {};

        let canvas_param = '';
        try {

            let bodyArray = req.body.signed_request.split(".");
            let canvas_consumer_secret = process.env.CANVAS_CONSUMER_SECRET;
            let consumerSecret = bodyArray[0];
            let encoded_envelope = bodyArray[1];
            let check = crypto.createHmac("sha256", canvas_consumer_secret).update(encoded_envelope).digest("base64");

            if (check === consumerSecret) {
                envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));

                canvas_param = (envelope.context && envelope.context.environment && envelope.context.environment.parameters) ? envelope.context.environment.parameters : {};
                authenticate = true;
            }
        } catch (e) {
            authenticate = false;

        }


        if (authenticate == false && canvas_param) {
            //Enable comment below to check authorisation
            return res.send({ code: 401, message: "Unauthorized" });
        } else {
            let search = JSON.stringify(canvas_param);
            search = new Buffer(search).toString('base64');

            return res.render('../src/index', { baseUrl, canvas_param: search });
        }


    });

    router.get('/statistics-example', function (req, res) {


        let canvas_param = {
            "sport_id": "Baseball",
            "season_id": "a2Cp0000000AdmdEAC",
            "comp_id": "a0Ap0000004g9eaEAA",
            "div_id": "a0Ap0000004g9eaEAA",
            "round_id": 9086,
            "fixture_id": 41067,
            "fixtureteam_id": 67122,
            "fixtureparticipant_id": 321671,
            "team_id": "a0Rp0000004ALbyEAG"

        };

        let search = JSON.stringify(canvas_param);
        search = new Buffer(search).toString('base64');
        return res.render('../src/index', { baseUrl, canvas_param: search });
    });


    return router;
};

export default routes;

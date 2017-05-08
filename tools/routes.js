import express from "express";
import request from "request";
import http from "http";
import path from 'path';
import crypto from "crypto";
const router = express.Router();
const appConfig = require('../config');
import * as env from '../env';

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

            console.log(body);
            if (!error && (response.statusCode == 200 || response.statusCode == 404)) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/cgi/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        const url = appConfig.CGI_URL + '/' + req.params[0] + search;
        const options = {
            url: url,
            headers: {
                'Authorization': appConfig.CGI_AUTHORIZATION,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',

            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/sport-tg-website/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        const url = appConfig.SPORTS_TG_WEBSITE + '/' + req.params[0] + search;
        const options = {
            url: url,
            headers: {
                'Authorization': appConfig.CGI_AUTHORIZATION,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/awsapi-stg/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        const url = appConfig.AWS_STG_SERVER_URL + '/' + req.params[0] + search;
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
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.get('/result-entry-mock/get/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        const url = appConfig.RESULT_ENTRY_MOCK_API_URL + '/' + req.params[0] + search;

        const options = {
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth': appConfig.RESULT_ENTRY_MOCK_API_AUTH,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            } else {
                res.send(error);
            }
        }

        request(options, callback);
    });

    router.post('/result-entry-mock/post/*', function (req, res) {
        let search = (req._parsedUrl && req._parsedUrl.search) ? req._parsedUrl.search : '';
        const url = appConfig.RESULT_ENTRY_MOCK_API_URL + '/' + req.params[0] + search;
        let post_options = {
            host: appConfig.RESULT_ENTRY_MOCK_API_HOST,
            port: appConfig.RESULT_ENTRY_MOCK_API_POST,
            path: '/' + req.params[0],
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // Set up the request
        let post_req = http.request(post_options, function (response) {
            let data = "";
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                res.send(data);
            });
        });
        // post the data
        post_req.write(JSON.stringify(req.body));
        post_req.end();

    });

    router.post('/results-entry', function (req, res) {
        let authenticate = false;
        let envelope = {
            "context": {"user": {"userId": "Test"}, "environment": {"record": {"Id": "a0V2800000283AxEAI"}}}
        };
        let fixtureId = 0;
        try {

            let bodyArray = req.body.signed_request.split(".");
            let canvas_consumer_secret = env.CANVAS_CONSUMER_SECRET;
            let consumerSecret = bodyArray[0];
            let encoded_envelope = bodyArray[1];
            let check = crypto.createHmac("sha256", canvas_consumer_secret).update(encoded_envelope).digest("base64");

            if (check === consumerSecret) {
                envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));

                fixtureId =  (envelope.context && envelope.context.environment && envelope.context.environment.parameters && envelope.context.environment.parameters.fixtureId)?envelope.context.environment.parameters.fixtureId:0;
                authenticate = true;
            }
        } catch (e) {
            authenticate = false;

        }

        if (authenticate == false && fixtureId==0) {
            //Enable comment below to check authorisation
            return res.send({code: 401, message: "Unauthorized"});
        }

        const url = appConfig.LOCAL_URL + appConfig.LOCAL_PORT + '/results-entry?fixtureId=' + fixtureId + '&token=7EF98CA03FC2739BA1938244B3409C3F';
        const options = {
            url: url,
            strictSSL: false,
            secureProtocol: 'TLSv1_method',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
               // return   res.sendFile(path.join(__dirname, '../src/index.html'),{fixture});
            } else {
                res.send(error);
            }
        }

        request(options, callback);


    });



    return router;
};

export default routes;

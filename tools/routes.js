import express from "express";
import request from "request";
import http from "http";
import https from "https";
import path from 'path';
import crypto from "crypto";
const router = express.Router();
const appConfig = require('../config');
import * as env from '../env';
const baseUrl = appConfig.LOCAL_URL+':'+appConfig.LOCAL_PORT;

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

        let url = appConfig.PLAYER_STAT_API_HEROKU_URL   + '/' + req.params[0] + search;
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

        let url = appConfig.PLAYER_STAT_API_HOST +':' +  appConfig.PLAYER_STAT_API_PORT + '/' + req.params[0] + search;
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
            console.log('post_options', post_options);
            // Set up the request
            let post_req = _http.request(post_options, function (response) {
                let data = "";
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    console.log('data',data);
                    res.send(data);
                }).on('error', function (e) {
                    console.log('error',e);
                    res.send(e);
                });
            });
            // post the data
            post_req.write(JSON.stringify(req.body));
            console.log('req.body',JSON.stringify(req.body));
            post_req.on('error', function (e) {
                console.log('error',e);
                res.send(e);
            });
            post_req.end();
        } catch (e) {
            console.log('error',e);
            res.send(e);
        }
    });


    router.post('/statistics', function (req, res) {
        let authenticate = false;
        let envelope = {};

     let canvas_param = 'ew0KICAiYWxnb3JpdGhtIjogIkhNQUNTSEEyNTYiLA0KICAiaXNzdWVkQXQiOiAxMDk4MjczODk5LA0KICAidXNlcklkIjogIjAwNXAwMDAwMDAxVEpDbkFBTyIsDQogICJjbGllbnQiOiB7DQogICAgInJlZnJlc2hUb2tlbiI6IG51bGwsDQogICAgImluc3RhbmNlSWQiOiAiXzpSZXN1bHRfQ2FudmFzOmpfaWQwOmpfaWQxOmNhbnZhc2FwcCIsDQogICAgInRhcmdldE9yaWdpbiI6ICJodHRwczovL3Nwb3J0c3RnLS1kZXYuY3MzMS5teS5zYWxlc2ZvcmNlLmNvbSIsDQogICAgImluc3RhbmNlVXJsIjogImh0dHBzOi8vc3BvcnRzdGctLURldi5jczMxLm15LnNhbGVzZm9yY2UuY29tIiwNCiAgICAib2F1dGhUb2tlbiI6ICIwMERwMDAwMDAwMERKSVAhQVFzQVFMXzFsbzV4YjhISG1nLjZZVFJsaVo0ODVPOHZWQzVPX0ZKNk9BNF9MUXQ1ZVY2OTFhcVJjUTlPeld3bmZRbVVqdUxQWkxiMllCeVM0M1YwckdPXzFRYlY3a0lmIg0KICB9LA0KICAiY29udGV4dCI6IHsNCiAgICAidXNlciI6IHsNCiAgICAgICJ1c2VySWQiOiAiMDA1cDAwMDAwMDFUSkNuQUFPIiwNCiAgICAgICJ1c2VyTmFtZSI6ICJiYmFjaG92c2tpQHNwb3J0c3RnLmNvbS5kZXYiLA0KICAgICAgImZpcnN0TmFtZSI6ICJCb3JpcyIsDQogICAgICAibGFzdE5hbWUiOiAiQmFjaG92c2tpIiwNCiAgICAgICJlbWFpbCI6ICJiYmFjaG92c2tpQHNwb3J0c3RnLmNvbSIsDQogICAgICAiZnVsbE5hbWUiOiAiQm9yaXMgQmFjaG92c2tpIiwNCiAgICAgICJsb2NhbGUiOiAiZW5fQVUiLA0KICAgICAgImxhbmd1YWdlIjogImVuX1VTIiwNCiAgICAgICJ0aW1lWm9uZSI6ICJBdXN0cmFsaWEvU3lkbmV5IiwNCiAgICAgICJwcm9maWxlSWQiOiAiMDBlMjgwMDAwMDFPUk96IiwNCiAgICAgICJyb2xlSWQiOiAiMDBFMjgwMDAwMDFWWHZtIiwNCiAgICAgICJ1c2VyVHlwZSI6ICJTVEFOREFSRCIsDQogICAgICAiY3VycmVuY3lJU09Db2RlIjogIkFVRCIsDQogICAgICAicHJvZmlsZVBob3RvVXJsIjogImh0dHBzOi8vc3BvcnRzdGctLURldi0tYy5jczMxLmNvbnRlbnQuZm9yY2UuY29tL3Byb2ZpbGVwaG90by8wMDUvRiIsDQogICAgICAicHJvZmlsZVRodW1ibmFpbFVybCI6ICJodHRwczovL3Nwb3J0c3RnLS1EZXYtLWMuY3MzMS5jb250ZW50LmZvcmNlLmNvbS9wcm9maWxlcGhvdG8vMDA1L1QiLA0KICAgICAgInNpdGVVcmwiOiBudWxsLA0KICAgICAgInNpdGVVcmxQcmVmaXgiOiBudWxsLA0KICAgICAgIm5ldHdvcmtJZCI6IG51bGwsDQogICAgICAiYWNjZXNzaWJpbGl0eU1vZGVFbmFibGVkIjogZmFsc2UsDQogICAgICAiaXNEZWZhdWx0TmV0d29yayI6IHRydWUNCiAgICB9LA0KICAgICJsaW5rcyI6IHsNCiAgICAgICJsb2dpblVybCI6ICJodHRwczovL3Nwb3J0c3RnLS1EZXYuY3MzMS5teS5zYWxlc2ZvcmNlLmNvbSIsDQogICAgICAiZW50ZXJwcmlzZVVybCI6ICIvc2VydmljZXMvU29hcC9jLzM5LjAvMDBEcDAwMDAwMDBESklQIiwNCiAgICAgICJtZXRhZGF0YVVybCI6ICIvc2VydmljZXMvU29hcC9tLzM5LjAvMDBEcDAwMDAwMDBESklQIiwNCiAgICAgICJwYXJ0bmVyVXJsIjogIi9zZXJ2aWNlcy9Tb2FwL3UvMzkuMC8wMERwMDAwMDAwMERKSVAiLA0KICAgICAgInJlc3RVcmwiOiAiL3NlcnZpY2VzL2RhdGEvdjM5LjAvIiwNCiAgICAgICJzb2JqZWN0VXJsIjogIi9zZXJ2aWNlcy9kYXRhL3YzOS4wL3NvYmplY3RzLyIsDQogICAgICAic2VhcmNoVXJsIjogIi9zZXJ2aWNlcy9kYXRhL3YzOS4wL3NlYXJjaC8iLA0KICAgICAgInF1ZXJ5VXJsIjogIi9zZXJ2aWNlcy9kYXRhL3YzOS4wL3F1ZXJ5LyIsDQogICAgICAicmVjZW50SXRlbXNVcmwiOiAiL3NlcnZpY2VzL2RhdGEvdjM5LjAvcmVjZW50LyIsDQogICAgICAiY2hhdHRlckZlZWRzVXJsIjogIi9zZXJ2aWNlcy9kYXRhL3YzMS4wL2NoYXR0ZXIvZmVlZHMiLA0KICAgICAgImNoYXR0ZXJHcm91cHNVcmwiOiAiL3NlcnZpY2VzL2RhdGEvdjM5LjAvY2hhdHRlci9ncm91cHMiLA0KICAgICAgImNoYXR0ZXJVc2Vyc1VybCI6ICIvc2VydmljZXMvZGF0YS92MzkuMC9jaGF0dGVyL3VzZXJzIiwNCiAgICAgICJjaGF0dGVyRmVlZEl0ZW1zVXJsIjogIi9zZXJ2aWNlcy9kYXRhL3YzMS4wL2NoYXR0ZXIvZmVlZC1pdGVtcyIsDQogICAgICAidXNlclVybCI6ICIvMDA1cDAwMDAwMDFUSkNuQUFPIg0KICAgIH0sDQogICAgImFwcGxpY2F0aW9uIjogew0KICAgICAgIm5hbWUiOiAiUmVzdWx0IENhbnZhcyIsDQogICAgICAiY2FudmFzVXJsIjogImh0dHBzOi8vZWMyLTU0LTE2OS03Mi00MS5hcC1zb3V0aGVhc3QtMS5jb21wdXRlLmFtYXpvbmF3cy5jb20vcmVzdWx0cy1lbnRyeSIsDQogICAgICAiYXBwbGljYXRpb25JZCI6ICIwNlBwMDAwMDAwMDRFbm8iLA0KICAgICAgInZlcnNpb24iOiAiMS4wIiwNCiAgICAgICJhdXRoVHlwZSI6ICJTSUdORURfUkVRVUVTVCIsDQogICAgICAicmVmZXJlbmNlSWQiOiAiMDlIcDAwMDAwMDAwMll0IiwNCiAgICAgICJvcHRpb25zIjogW10sDQogICAgICAic2FtbEluaXRpYXRpb25NZXRob2QiOiAiTm9uZSIsDQogICAgICAiZGV2ZWxvcGVyTmFtZSI6ICJSZXN1bHRfQ2FudmFzIiwNCiAgICAgICJpc0luc3RhbGxlZFBlcnNvbmFsQXBwIjogZmFsc2UsDQogICAgICAibmFtZXNwYWNlIjogIiINCiAgICB9LA0KICAgICJlbnZpcm9ubWVudCI6IHsNCiAgICAgICJyZWZlcmVyIjogbnVsbCwNCiAgICAgICJsb2NhdGlvblVybCI6ICJodHRwczovL3Nwb3J0c3RnLS1kZXYtLWMuY3MzMS52aXN1YWwuZm9yY2UuY29tL2FwZXgvUmVzdWx0RW50cnlDYW52YXNUZXN0P0lkPTM5MSIsDQogICAgICAiZGlzcGxheUxvY2F0aW9uIjogIlZpc3VhbGZvcmNlIiwNCiAgICAgICJzdWJsb2NhdGlvbiI6IG51bGwsDQogICAgICAidWlUaGVtZSI6ICJUaGVtZTMiLA0KICAgICAgImRpbWVuc2lvbnMiOiB7DQogICAgICAgICJ3aWR0aCI6ICI4MDBweCIsDQogICAgICAgICJoZWlnaHQiOiAiMTAwMHB4IiwNCiAgICAgICAgIm1heFdpZHRoIjogIjEwMDBweCIsDQogICAgICAgICJtYXhIZWlnaHQiOiAiMjAwMHB4IiwNCiAgICAgICAgImNsaWVudFdpZHRoIjogIjE2NDVweCIsDQogICAgICAgICJjbGllbnRIZWlnaHQiOiAiMzBweCINCiAgICAgIH0sDQogICAgICAicGFyYW1ldGVycyI6IHsNCiAgICAgICAgICAgICAgICAic3BvcnRfaWQiOiAiQmFzZWJhbGwiLA0KICAgICAgICAgICAgInNlYXNvbl9pZCI6ICJhMkNwMDAwMDAwMEFkbWRFQUMiLA0KICAgICAgICAgICAgImNvbXBfaWQiOiAiYTBBcDAwMDAwMDRnOWVhRUFBIiwNCiAgICAgICAgICAgICJkaXZfaWQiOiAiYTBBcDAwMDAwMDRnOWVhRUFBIiwNCiAgICAgICAgICAgICJyb3VuZF9pZCI6IDkwODYsDQogICAgICAgICAgICAiZml4dHVyZV9pZCI6IDQxMDY3LA0KICAgICAgICAgICAgImZpeHR1cmV0ZWFtX2lkIjogNjcxMjIsDQogICAgICAgICAgICAiZml4dHVyZXBhcnRpY2lwYW50X2lkIjogMzIxNjcxLA0KICAgICAgICAgICAgInRlYW1faWQiOiAiYTBScDAwMDAwMDRBTGJ5RUFHIg0KICAgICAgfSwNCiAgICAgICJyZWNvcmQiOiB7fSwNCiAgICAgICJ2ZXJzaW9uIjogew0KICAgICAgICAic2Vhc29uIjogIlNQUklORyIsDQogICAgICAgICJhcGkiOiAiMzkuMCINCiAgICAgIH0NCiAgICB9LA0KICAgICJvcmdhbml6YXRpb24iOiB7DQogICAgICAib3JnYW5pemF0aW9uSWQiOiAiMDBEcDAwMDAwMDBESklQRUE0IiwNCiAgICAgICJuYW1lIjogIlNwb3J0c1RHIiwNCiAgICAgICJtdWx0aWN1cnJlbmN5RW5hYmxlZCI6IHRydWUsDQogICAgICAibmFtZXNwYWNlUHJlZml4IjogbnVsbCwNCiAgICAgICJjdXJyZW5jeUlzb0NvZGUiOiAiQVVEIg0KICAgIH0NCiAgfQ0KfQ==';
        try {

            let bodyArray = req.body.signed_request.split(".");
            let canvas_consumer_secret = env.CANVAS_CONSUMER_SECRET;
            let consumerSecret = bodyArray[0];
            let encoded_envelope = bodyArray[1];
            let check = crypto.createHmac("sha256", canvas_consumer_secret).update(encoded_envelope).digest("base64");
            if (check === consumerSecret) {
                envelope = JSON.parse(new Buffer(encoded_envelope, "base64").toString("ascii"));

                //canvas_param =  (envelope.context && envelope.context.environment && envelope.context.environment.parameters && envelope.context.environment.parameters.fixtureId)?envelope.context.environment.parameters.fixtureId:0;
                authenticate = true;
            }
        } catch (e) {
            authenticate = false;

        }


        if (authenticate == false && canvas_param) {
            //Enable comment below to check authorisation
            return res.send({code: 401, message: "Unauthorized"});
        } else {
            return res.render('../src/index', {canvas_param, baseUrl});
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
        return res.render('../src/index', {baseUrl, canvas_param:search});
    });


    return router;
};

export default routes;

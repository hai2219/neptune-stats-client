/**
 * Created by long on 4/21/17.
 */
import request from 'request';
const Config = require('../../config');

export function httpGetPlayerStat(path, param) {
    return new Promise(function (resolve, reject) {
        let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.PLAYER_STAT_GET + path, param);
       console.log(url);
        request.get(  url ,{timeout: 12000}, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                if (body) {
                    return resolve(JSON.parse(body));
                }
                return resolve();
            } else {
                return reject(error || body);
            }
        });
    });
}

export function httpPostPlayerStat(path, param, data={}) {
    return new Promise(function (resolve, reject) {
        let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.PLAYER_STAT_POST + path, param);
        let _headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        fetch(url, {
            method: 'POST',
            headers: _headers,
            body: JSON.stringify(data)
        }) .then(response => response.json())
            .then((response) => {
                if (response) {

                    return resolve(response);

                }else {
                    return reject(response.body);
                }

            }).catch((error) => {
            return error;
        });
    });
}

export function httpGetHerokuPlayerStat(path, param) {
    return new Promise(function (resolve, reject) {
        let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.PLAYER_STAT_HEROKU_GET + path, param);
        console.log(url);
        request.get(  url ,{timeout: 12000}, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                if (body) {
                    return resolve(JSON.parse(body));
                }
                return resolve();
            } else {
                return reject(error || body);
            }
        });
    });
}


// export function httpPostHerokuPlayerStat(path, param, data={}) {
//     return new Promise(function (resolve, reject) {
//         let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.PLAYER_STAT_HEROKU_POST + path, param);
//         let _headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
//
//         fetch(url, {
//             method: 'POST',
//             headers: _headers,
//             body: JSON.stringify(data)
//         }) .then(response =>  response.json()
//         ) .then((response) => {
//
//                 if (response) {
//
//                     return resolve(response);
//
//                 }else {
//                     return reject(response.body);
//                 }
//
//             }).catch((error) => {
//
//             return reject(error);
//         });
//     });
// }

export function httpPostHerokuPlayerStat(path, param, data={}) {
    return new Promise(function (resolve, reject) {
        let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.PLAYER_STAT_HEROKU_POST + path, param);
        let _headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        fetch(url, {
            method: 'POST',
            headers: _headers,
            body: JSON.stringify(data)
        }) .then(response => {
            console.log('response',response );
            if(response.status == 200){
                return resolve(response);
            }else{
                return reject(response);
            }

        }).catch((error) => {

            return reject(error);

        });
    });
}


export function actualUrlParse(path, obj = null) {
    let newUrl = path;
    if (typeof obj == 'object') {
        for (let i in obj) {
            let param =  encodeURIComponent( obj[i]);
            newUrl = newUrl.replace("{" + i + "}", param);
        }
        return newUrl;
    } else {
        new Error("Error: invalid url");
    }
}

export function createRootUrl(url, port) {

    url = url.slice(-1) == ":" ? url.slice(0, -1) : url;

    if(port && port.length > 0){
        return url + ":" + port;
    } else {
        return url;
    }
}




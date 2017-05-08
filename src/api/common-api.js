/**
 * Created by long on 4/21/17.
 */
import request from 'request';
const Config = require('../../config');

export function httpGet(path, param) {
    return new Promise(function (resolve, reject) {
        let url = actualUrlParse(createRootUrl(Config.LOCAL_URL, Config.LOCAL_PORT) + Config.API_GET + path, param);
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



export function actualUrlParse(path, obj = null) {
    let newUrl = path;
    if (typeof obj == 'object') {
        for (let i in obj) {
            let param = encodeURIComponent( obj[i]);
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




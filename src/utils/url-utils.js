
/**
 * The URL utils
 *
 * @author rocachien
 * @company NEXLE
 * @create 2017/02/28 15:36
 * @update 2017/02/28 15:36
 * @file utils/url-utils.js
 *
 */
"use strict";

import {browserHistory} from "react-router";

/**
 * Get and Set location
 *
 * @function location
 * @param url
 * Ex:
 * - none Get current location
 * - http://domain?param=value Go to new location
 * - {a:'aaa', b: 'bbb'} Go to current location with new param(s)
 *
 * @returns current location
 */
export function location(url) {
    let search = "";
    let curLocation = browserHistory.getCurrentLocation();

    switch (typeof url)
    {
        case "string":
            return browserHistory.push(url);

        case "object":
            for(let key in url){
                let val = url[key];

                search += "&"+key +"="+ val;
            }

            url = curLocation.pathname + "?" + search.replace("&", "");

            return browserHistory.push(url);
    }

    return curLocation;
}

/**
 * Get and Set query(ies)
 *
 * @function query
 * @param params
 * Ex:
 * - none to get all params;
 * - {a: "aaa"} to change one param;
 * - {a:"MATCHED", b: "dddd", c: "0-1-2-3"} to change more
 *
 * @returns {*}
 */

export function query(params) {
    let curLocation = location();
    let curQuery = curLocation.query;

    if(!params || params === undefined) return curQuery;

    switch (typeof params)
    {
        case "string":
            return curQuery[params] || null;

        case "object":

            for(let key in params){
                let val = params[key];

                curQuery[key] = val;
            }

            return curQuery;

        default: return false;
    }
}

/**
 * get search string with query object
 * @param query
 * @return {*}
 */
export function getSearchWithQuery(query) {
    let curLocation = location();

    if(!query || query === undefined) return curLocation.search;

    let search = "?";

    for(let key in query){
        let val = query[key];

        search += key + "=" + val + "&";
    }

    return search.substr(0, search.length - 1);
}

/**
 * Get Client param
 *
 * @function getClient
 * @returns {{cache: *, assoc_id: *, club_id: *, comp_id: *, team_id: *}}
 */
export function getClient() {
    let cl = query("c") || query("client");
    let client = cl.split('-');

    if(client.length < 5) return false;

    return {
        cache: client[0],
        assoc_id: client[1],
        club_id: client[2],
        comp_id: client[3],
        team_id: client[4],
    };
}

/**
 * Open window
 *
 * @function openWindow
 * @param {string} url - This is url
 * @param {string} target - This is target type: _blank, _parent, _self, _top, name
 *
 */
export function openWindow(url, target="_self") {
    if(url) window.open(url, target);
}


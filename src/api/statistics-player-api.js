/**
 * Created by long on 5/3/17.
 */

const Config = require('../../config');
import * as CommonApi from "./common-api";
import * as URLUtils from  '../utils/url-utils';

export function getFormat(competitionId) {
    let path = Config.PLAYER_STAT_GET_FORMAT_PATH;

    const param = {
        competitionId: competitionId,

    };

    return CommonApi.httpGet(path, param);
}

export function getPlayer(competitionId,teamId) {
    let path = Config.PLAYER_STAT_GET_PLAYER_PATH;

    const param = {
        competitionId: competitionId,
        teamId: teamId,

    };

    return CommonApi.httpGet(path, param);
}
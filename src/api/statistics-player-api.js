/**
 * Created by long on 5/3/17.
 */

const Config = require('../../config');
import * as CommonApi from "./common-api";
import * as URLUtils from  '../utils/url-utils';

export function getFormat(season, competitionId) {
    let path = Config.PLAYER_STAT_GET_FORMAT_PATH;

    const param = {
        competitionId: competitionId,
        season:season,
    };

    return CommonApi.httpGet(path, param);
}

export function getPlayer(season,competition,division, round, fixture) {
    let path = Config.PLAYER_STAT_GET_PLAYER_PATH;

    const param = {
        season: season,
        competition: competition,
        division: division,
        round: round,
        fixture: fixture,

    };

    return CommonApi.httpGet(path, param);
}
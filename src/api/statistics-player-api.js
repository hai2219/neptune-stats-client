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

    return CommonApi.httpGetPlayerStat(path, param);
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

    return CommonApi.httpGetPlayerStat(path, param);
}

export function savePerPerson(sport,season,comp, div, round, fixture,data) {
         let path = Config.PLAYER_STAT_GET_PLAYER_PATH;

        const param = {
            sport_id: sport,
            season_id: season,
            comp_id: comp,
            div_id: div,
            round_id: round,
            fixture_id:fixture

        };

    return CommonApi.httpPostPlayerStat(path,param,data);
}
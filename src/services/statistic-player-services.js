/**
 * Created by long on 5/3/17.
 */
import * as StatisticsApi from '../api/statistics-player-api';

export function getFormat(season, competitionId){
    return StatisticsApi.getFormat(season, competitionId);
}

export function getPlayer(season,competition,division, round, fixture, team){
    return StatisticsApi.getPlayer(season,competition,division, round, fixture, team);
}

export function getIndividualPlayer(data, sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code){
    return StatisticsApi.getIndividualPlayer(data, sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code);
}

export function savePlayer(sport,season,comp, div, round, fixture,data) {
    return StatisticsApi.savePlayer(sport,season,comp, div, round, fixture,data);
}

export function saveOrder(sport,season,comp, div, round, fixture,data) {
    return StatisticsApi.saveOrder(sport,season,comp, div, round, fixture,data);
}

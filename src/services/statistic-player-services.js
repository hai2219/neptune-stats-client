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

export function getIndividualPlayer(sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code){
    return StatisticsApi.getIndividualPlayer(sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code);
}

export function savePerPerson(sport,season,comp, div, round, fixture,data) {
    return StatisticsApi.savePerPerson(sport,season,comp, div, round, fixture,data);
}


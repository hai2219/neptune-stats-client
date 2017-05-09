/**
 * Created by long on 5/3/17.
 */
import * as StatisticsApi from '../api/statistics-player-api';

export function getFormat(season, competitionId){
    return StatisticsApi.getFormat(season, competitionId);
}

export function getPlayer(season,competition,division, round, fixture){
    return StatisticsApi.getPlayer(season,competition,division, round, fixture);
}

export function savePerPerson(sport,season,comp, div, round, fixture,data) {
    return StatisticsApi.savePerPerson(sport,season,comp, div, round, fixture,data);
}


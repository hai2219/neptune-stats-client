/**
 * Created by long on 5/3/17.
 */
import * as StatisticsApi from '../api/statistics-player-api';

export function getFormat(season, competitionId){
    return StatisticsApi.getFormat(season, competitionId);
}

export function getPlayerr(season,competition,division, round, fixture){
    return StatisticsApi.getPlayerr(season,competition,division, round, fixture);
}
/**
 * Created by long on 5/3/17.
 */
import * as StatisticsApi from '../api/statistics-player-api';

export function getFormat(competitionId){
    return StatisticsApi.getFormat(competitionId);
}

export function getPlayer(competitionId,teamId){
    return StatisticsApi.getPlayer(competitionId, teamId);
}
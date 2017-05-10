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


export function getIndividualPlayer(sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code) {

    let path = category ?  Config.PLAYER_STAT_GET_INDIVIDUAL_CATEGORY_PLAYER_PATH : Config.PLAYER_STAT_GET_INDIVIDUAL_PLAYER_PATH;

    let param = category ? {
        sport_id: sport,
        season_id: season,
        comp_id: comp,
        div_id: div,
        round_id: round,
        fixture_id: fixture,
        fixtureteam_id: fixtureteam,
        fixtureparticipant_id: fixtureparticipant,
        category: category,
        stat_code: stat_code,

    }: {
        sport_id: sport,
        season_id: season,
        comp_id: comp,
        div_id: div,
        round_id: round,
        fixture_id: fixture,
        fixtureteam_id: fixtureteam,
        fixtureparticipant_id: fixtureparticipant,
        stat_code: stat_code,

    };

    // return CommonApi.httpGetPlayerStat(path, param);
    return new Promise(function (resolve,reject) {

        let result = [
            { value:44, player:'a06p0000003n5FQAAY', code:'AB', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'R', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'H', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'44B', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'3B', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'HR', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'RB1', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'TB', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'BB', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SD', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SO', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SO', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SB', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'CS', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SB', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'SP', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:'AVG', category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:'a06p0000003n5FQAAY', code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Batting', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
            { value:44, player:100, code:34, category:'Fielding', confirmed:true  },


        ];

        resolve(result);
    });

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
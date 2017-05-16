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

export function getPlayer(season,competition,division, round, fixture, team) {
    let path = Config.PLAYER_STAT_GET_PLAYER_PATH;

    const param = {
        season: season,
        competition: competition,
        division: division,
        round: round,
        fixture: fixture,
        team:team

    };

    return CommonApi.httpGetPlayerStat(path, param);
}


export function getIndividualPlayer(data, sport,season,comp, div, round, fixture, fixtureteam, fixtureparticipant, category, stat_code) {

    let path = category && category != '' ?  Config.PLAYER_STAT_GET_INDIVIDUAL_CATEGORY_PLAYER_PATH : Config.PLAYER_STAT_GET_INDIVIDUAL_PLAYER_PATH;

   console.log('getIndividualPlayer',data.players);
  let arrP = [];
    let arr = ['AB','R','2B','3B','HR', 'RBI','TB','BB','K','SB','CS','SP','BA','IP','H','ER','HR','E','A','PO'];

    for(let index = 0; index < data.players.length; index ++ ) {
        let player = data.players[index];
        for (let i = 0; i < arr.length; i++) {

            let param = category ? {
                sport_id: sport,
                season_id: season,
                comp_id: comp,
                div_id: div,
                round_id: round,
                fixture_id: fixture,
                fixtureteam_id: fixtureteam,
                fixtureparticipant_id: player.fixtureParticipantId,
                category: category,
                stat_code: arr[i],

            } : {
                sport_id: sport,
                season_id: season,
                comp_id: comp,
                div_id: div,
                round_id: round,
                fixture_id: fixture,
                fixtureteam_id: fixtureteam,
                fixtureparticipant_id: player.fixtureParticipantId,
                stat_code: arr[i],

            };
            let p = CommonApi.httpGetHerokuPlayerStat(path, param,  player.playerSfid);
            arrP.push(p);
        }
    }


    return Promise.all(arrP) ;

    // return CommonApi.httpGetHerokuPlayerStat(path, param);
    // return new Promise(function (resolve,reject) {
    //
    //     let result = [
    //         { value:44, player:'a06p0000003n5SfAAI', code:'AB', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'R', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'H', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'44B', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'3B', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'HR', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'RB1', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'TB', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'BB', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SD', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SO', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SO', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SB', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'CS', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SB', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'SP', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:'AVG', category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:'a06p0000003n5SfAAI', code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Batting', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Pitching', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //         { value:44, player:100, code:34, category:'Fielding', confirmed:true  },
    //
    //
    //     ];
    //
    //     resolve(result);
    // });

}



export function savePlayer(sport,season,comp, div, round, fixture,data) {
         let path = Config.PLAYER_STAT_SAVE_PLAYER_PATH;

        const param = {
            sport_id: sport,
            season_id: season,
            comp_id: comp,
            div_id: div,
            round_id: round,
            fixture_id:fixture

        };

    return CommonApi.httpPostHerokuPlayerStat(path,param,data);
}

export function saveOrder(sport,season,comp, div, round, fixture,data) {
    let path = Config.PLAYER_STAT_SAVE_ORDER_PATH;

    const param = {
        sport_id: sport,
        season_id: season,
        comp_id: comp,
        div_id: div,
        round_id: round,
        fixture_id:fixture

    };

    return CommonApi.httpPostHerokuPlayerStat(path,param,data);
}










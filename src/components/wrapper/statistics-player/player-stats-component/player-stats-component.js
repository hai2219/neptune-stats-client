/**
 * Created by long on 5/3/17.
 */
"use strict";

import React, {Component} from "react";
import TableScrollHorizontal from  '../../../common/table/table-scroll-horizontal-component';
import SortIcon from '../../../common/icon/sort-icon-component';
import Integer from '../../../common/input/input-integer-component';
import Float from '../../../common/input/input-float-component';
import ToggleComponent from '../../../common/toggle/toggle-button-component';
import * as SportConstant from "../../../../constant/sport-constant";
import PropTypes from 'prop-types';

export default class PlayerStatsComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            currentTab: this.props.currentTab,
            dataPlayer: this.props.dataPlayer,
            statisticsDefinitions: this.props.statisticsDefinitions,
            arrPerPerson: this.props.arrPerPerson,
            loaded: false
        };

        this.currentTab = 0;
        this.dataHeader = []; /** for header of table **/
        this.dataStats = []; /** for stats of table **/
        this.dataFormat = []; /** for header of table **/
        this.dataBody = []; /** for body of table **/
        this.dataSource = []; /** data source of table **/

    }

    componentDidMount() {
         
    }

    componentWillUnmount(){

    }

    parseData() {
        const {statisticsDefinitions, dataPlayer, arrPerPerson, currentTab, sportID} = this.props;

        if(!statisticsDefinitions || !dataPlayer || !arrPerPerson || !currentTab || !sportID ) return false;

        this.parseStatsData();
        this.parseFormatData();
        this.parseHeaderData();
        this.parseBodyData();

        return true;
    }

    getItemValue(playerSfId, code, category){

        if(this.dataStats){
            for(let i= 0 ; i < this.dataStats.length; i++){
                let temp = this.dataStats[i];

                if(temp.player == playerSfId && temp.code == code && temp.category == category){

                    return temp.value;
                }
            }
            return null;
        }
        return null;
    }

    getArrCodeParam(strMath){

        return strMath.match(/[^[\]]+(?=])/g);

    }

    calculateAvg(playerSfId, arrCode, category, mathExpress){

        if(arrCode && arrCode.length > 0){
            let math = mathExpress;
            for(let i = 0 ; i < arrCode.length; i++){
                let code = arrCode[i];
                let value = this.getItemValue(playerSfId,code,category) ;

                if(value){
                    math = math.replace('[' + code + ']',value);
                }else{
                    math = math.replace('[' + code + ']', 0);
                }
            }
            return eval(math);
        }
        return null;

    }

    parseBodyData() {

        let {sportID, currentTab, dataPlayer} = this.props;
        let dataSource = [];
        let category = 1;

        if(!sportID || !this.dataFormat || this.dataFormat.length < 1 || !dataPlayer || !dataPlayer.players || dataPlayer.players.length < 1) return [];

        dataPlayer =  dataPlayer.players;

        switch (currentTab)
        {
            case 1: category = "Batting"; break;
            case 2: category = "Pitching"; break;
            case 3: category = "Fielding"; break;
        }

        for (let i = 0; i < dataPlayer.length; i++) {
            let player = dataPlayer[i];
            let dataRow = {};
            let name = player.firstName + " " + (player.middleName || "") + " " + player.lastName;

            dataRow.playerId = player.playerId;
            dataRow.num = player.jerseyNumber ? player.jerseyNumber : '00';
            dataRow.name = name;
            dataRow.category = category;
            dataRow.order = '';
            dataRow.toggle = false;

            this.dataFormat.map(f => {
                if (f.type == "Calculated") {

                    dataRow[f.code] = f.formula;
                } else {

                    dataRow[f.code] = this.getItemValue(player.playerSfid, f.code, category);
                }
            });

            dataSource.push(dataRow);
        }

        this.dataSource = dataSource;

        this.renderBody();
    }

    parseFormatData() {
        let {sportID, currentTab, statisticsDefinitions} = this.props;
        let code = [];
        let dataFormat = [];

        if(!sportID || !statisticsDefinitions || statisticsDefinitions.length <= 0) return [];

        currentTab = currentTab ? currentTab : 1;



        if(sportID == SportConstant.BASEBALL_ID) {
            switch (currentTab){
                case 1:
                    code = ["AB", "R", "H", "2B", "3B", "HR", "RB1", "TB", "BB", "SO", "SB", "CS", "SP", "AVG"]; //Miss: "3B", "RB1", "SP"
                    break;
                case 2:
                    code = ["IP", "H", "R", "ER", "BB", "SO", "HR", "ERA"]; //Miss: "SO", "ERA"
                    break;
                case 3:
                    code = ["E", "A", "PO", "FPCT"]; //Miss "E", "A", "FPCT"
                    break;
            }
        }else {
            code = ["AB", "R", "H", "2B", "TB", "BB", "SO", "SB", "CS", "SP", "AVG"];
        }

        for(let i = 0; i < code.length; i++) {
            let c = code[i];

            for (let j = 0; j < statisticsDefinitions.length; j++) {
                let s = statisticsDefinitions[j];

                if(c == s.code) {
                    dataFormat.push({code: c, type: s.type, formula: s.formula});
                    break;
                }
            }
        }

        this.dataFormat = dataFormat;
    }

    parseStatsData() {
        let {sportID, arrPerPerson} = this.props;

        if(!sportID || !arrPerPerson || arrPerPerson.length <= 0) return [];

        this.dataStats = arrPerPerson;
    }

    parseHeaderData() {
        let {sportID, currentTab} = this.props;
        let dataHeader = [];

        if(!sportID || !this.dataFormat || this.dataFormat.length <= 0) return [];

        currentTab = currentTab ? currentTab : 1;

        if(sportID == SportConstant.BASEBALL_ID) {
            switch (currentTab){
                case 1:
                    dataHeader.push(<SortIcon text={"#"} />);
                    dataHeader.push(<SortIcon text={"NAME"} />);
                    dataHeader.push(<SortIcon text={"ORDER"} />);
                    break;
                case 2:
                    dataHeader.push(<SortIcon text={"#"} />);
                    dataHeader.push(<SortIcon text={"NAME"} />);
                    dataHeader.push(<SortIcon text={"ORDER"} />);
                    break;
                case 3:
                    dataHeader.push(<SortIcon text={"#"} />);
                    dataHeader.push(<SortIcon text={"NAME"} />);
                    dataHeader.push("FIELDED");
                    break;
            }
        }else {
            dataHeader.push(<SortIcon text={"#"} />);
            dataHeader.push(<SortIcon text={"NAME"} />);
            dataHeader.push(<SortIcon text={"ORDER"} />);
        }

        this.dataFormat.map(f => {
            dataHeader.push(f.code);
        });

        this.dataHeader = dataHeader;
    }

    renderBody() {
        let {currentTab} = this.props;
        let dataBody = [];
        let isField = currentTab == 3 ? true : false;

        if(this.dataSource && this.dataSource.length > 0) {
            this.dataSource.map(row => {
                let renderRow = [];

                renderRow.push(row.num);
                renderRow.push(row.name);

                if(isField){
                    renderRow.push(<ToggleComponent />);
                }else{
                    renderRow.push(<Integer className="order" min={1} max={999} />);
                }

                this.dataFormat.map(f => {
                    if (f.type == "Calculated") {

                        renderRow.push("");
                    } else {

                        renderRow.push(<Float numOfDecimal={2} min={0} max={999} defaultValue={row[f.code]} />);
                    }
                });

                dataBody.push(renderRow);
            });
        }

        this.currentTab = currentTab;
        this.dataBody = dataBody;
    }

    render() {

        if(this.parseData() && this.dataHeader.length > 0){
            return (

                <div id="player-stats-wrapper-container">

                    <TableScrollHorizontal colsFreeze={3} styleFreeze={{width: "32%"}} styleScroll={{width: "68%"}} header={this.dataHeader} headerStyle={{color: '#4a4a4a'}} body={this.dataBody} />
                    <style>{css}</style>
                </div>

            );
        }else{
            return null;
        }
    }
}

PlayerStatsComponent.propTypes = {
    statisticsDefinitions: PropTypes.array,
    sportID: PropTypes.number,
    currentTab: PropTypes.number,
    dataPlayer: PropTypes.object,
    arrPerPerson: PropTypes.array,

    onEditStats: PropTypes.func
};

PlayerStatsComponent.defaultProps = {
    currentTab: 1,
};

const css = `
    #player-stats-wrapper-container { 
        background-color: rgba(241,245,248,1);
    }
    
    #player-stats-wrapper-container thead {
        background-color: white;
    }
    #player-stats-wrapper-container thead th {
        background-color: white;
        font-size: 14px;
        font-family: 'Roboto Condensed';
        font-weight: bold;
        height: 35px;
    }
    
    #player-stats-wrapper-container input {
        width: 42px;
        height: 30px;
        text-align: center;
        outline: none;
        font-size: 13px;
        color: rgb(81, 81, 81);
        font-family: Roboto;
        padding: 0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid rgb(216, 216, 216);
        border-radius: 2px;
        -webkit-border-radius: 2px
    }
    
    #player-stats-wrapper-container input.order {
        border: 1px solid rgb(0, 151, 222);
        color: rgb(0, 151, 222);
    }
    
    #player-stats-wrapper-container td {
        height: 54px;
        color: rgb(81, 81, 81);
        padding: 0 4px;
        font-size: 14px;
        font-family: Roboto;
    }
    
    #player-stats-wrapper-container tr:nth-child(odd) {
        background: #fbfbfc;
    }
    
    #player-stats-wrapper-container .horizontal-scroll-freeze tr td:nth-child(1) {
        width: 50px;
    }
    
    #player-stats-wrapper-container .horizontal-scroll-freeze tr td:nth-child(2) {
        width: 130px;
        text-align: left;
    }
    #player-stats-wrapper-container .horizontal-scroll-freeze tr th:nth-child(2) {
        text-align: left;
    }
   
    #player-stats-wrapper-container .horizontal-scroll-freeze tr td:nth-child(3) {
        width: 100px;
    }
    
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

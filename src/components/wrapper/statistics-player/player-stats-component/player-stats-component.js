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
import _ from "lodash";

export default class PlayerStatsComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            sort: {numb: true, name: false, order: false},
            currentSort: "numb",
            dataBody: []
        };

        this.dataHeader = []; /** for header of table **/
        this.dataStats = []; /** for stats of table **/
        this.dataFormat = []; /** for header of table **/
        this.dataSource = []; /** data source of table **/

        if(props.onEditStats) props.onEditStats(false);
        this.onSortClick = this.onSortClick.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate (prevProps, prevState) {

        let isParseData = false;
        if(this.state.dataBody.length == 0) {

            isParseData = true;
            this.parseData();
        }

        if (!isParseData && prevProps.currentTab !== this.props.currentTab) {
            if(prevProps.onEditStats) prevProps.onEditStats(false);
            this.parseData();
        }

        if(prevState.currentSort != this.state.currentSort) {
            this.renderBody();
        }
    }

    parseData() {

        const {statisticsDefinitions, dataPlayer, arrPerPerson, currentTab, sportID} = this.props;

        if(!statisticsDefinitions || !dataPlayer || !arrPerPerson || !currentTab || !sportID) return false;

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
            dataRow.orderValue = player.orderNumber;
            dataRow.orderError = false;
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
        let {sort} = this.state;
        let {sportID, currentTab} = this.props;
        let dataHeader = [];

        if(!sportID || !this.dataFormat || this.dataFormat.length <= 0) return [];

        currentTab = currentTab ? currentTab : 1;

        if(sportID == SportConstant.BASEBALL_ID) {
            switch (currentTab){
                case 1:
                case 2:
                    dataHeader.push(<SortIcon text={"#"} active={sort.numb} onClick={this.onSortClick}/>);
                    dataHeader.push(<SortIcon text={"NAME"} active={sort.name} onClick={this.onSortClick}/>);
                    dataHeader.push(<SortIcon text={"ORDER"} active={sort.order} onClick={this.onSortClick}/>);
                    break;
                case 3:
                    dataHeader.push(<SortIcon text={"#"} active={sort.numb} onClick={this.onSortClick}/>);
                    dataHeader.push(<SortIcon text={"NAME"} active={sort.name} onClick={this.onSortClick}/>);
                    dataHeader.push("FIELDED");
                    break;
            }
        }else {
            dataHeader.push(<SortIcon text={"#"} active={sort.numb} onClick={this.onSortClick}/>);
            dataHeader.push(<SortIcon text={"NAME"} active={sort.name} onClick={this.onSortClick}/>);
            dataHeader.push(<SortIcon text={"ORDER"} active={sort.order} onClick={this.onSortClick}/>);
        }

        this.dataFormat.map(f => {
            dataHeader.push(f.code);
        });

        this.dataHeader = dataHeader;
    }

    checkOrderDouble() {
        let found = false;
        let dataSource = _.cloneDeep(this.dataSource);

        this.dataSource.map(d => {
            d.orderError = false;

            if(!d.orderValue || d.orderValue == '') return d;

            for(let i = 0; i < dataSource.length; i++) {
                let s = dataSource[i];

                if(d.playerId != s.playerId && d.orderValue == s.orderValue) {
                    found = true;
                    d.orderError = true;
                }
            }

            return d;
        });

        return found;
    }

    onChangeOrder(playerId, value) {

        this.dataSource.map(row => {
            let newRow = row;

            if (row.playerId == playerId) {

                newRow.orderError = false;

                newRow.orderValue = value;
            }

            return newRow;
        });

        if(this.checkOrderDouble()) {
            // TODO: Do not save when order number is double
        }

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    onChangeToggle(playerId) {

        this.dataSource.map(row => {
            let newRow = row;

            if (row.playerId == playerId) {
                newRow.toggle = !row.toggle;
            }

            return newRow;
        });

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    onChangeStats(playerId, value) {

        this.dataSource.map(row => {
            let newRow = row;

            this.dataFormat.map(f => {
                if (f.type != "Calculated") {

                    if(playerId == row.playerId) {
                        newRow[f.code] = value;
                    }
                }
            });

            return newRow;
        });

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    onSortClick (field, active) {
// console.log("=========== onSortClick =============");

        let sort = {numb: false, name: false, order: false};
        let dataSource = this.dataSource;
        let order = active ? 'asc' : 'desc';
        let currentSort = field ? field : "numb";

        switch (field) {
            case "numb":
                dataSource = _.orderBy(dataSource, ["num"], [order]);
                sort.numb = active;
                break;
            case "name":
                dataSource = _.orderBy(dataSource, ["name"], [order]);
                sort.name = active;
                break;
            case "order":
                dataSource = _.orderBy(dataSource, ["orderValue"], [order]);
                sort.order = active;
                break;
        }

        this.dataSource = dataSource;

        this.renderBody();

        this.setState({
            sort, currentSort
        });
    }

    renderBody() {
        let {currentTab} = this.props;
        let dataBody = [];
        let isField = currentTab == 3 ? true : false;

        if(this.dataSource && this.dataSource.length > 0) {
            this.dataSource.map(row => {
                let renderRow = [];
                const playerId = row.playerId;

                renderRow.push(row.num);
                renderRow.push(row.name);

                if(isField){
                    let onChangeToggle = (id) => this.onChangeToggle(id);

                    renderRow.push(<ToggleComponent id={""+row.playerId} isChecked={row.toggle} onChange={onChangeToggle}/>);
                }else{
                    let onChangeOrder = (value) => this.onChangeOrder(playerId, value);
                    let inputStyle = {};

                    if(row.orderError){
                        inputStyle = {border: "1px solid rgb(244, 66, 66)"};
                    } else {
                        inputStyle = {border: "1px solid rgb(0, 151, 222)"};
                    }

                    renderRow.push(<Integer className="order" min={1} max={999} style={inputStyle} defaultValue={row.orderValue} onBlur={onChangeOrder}/>);
                }

                this.dataFormat.map(f => {
                    if (f.type == "Calculated") {

                        renderRow.push("");
                    } else {

                        let onChangeStats = (value) => this.onChangeStats(playerId, value);

                        if((isField && row.toggle) || (!isField && row.orderValue && parseInt(row.orderValue) > 0)){
                            renderRow.push(<Float numOfDecimal={2} min={0} max={999} defaultValue={row[f.code]} onBlur={onChangeStats}/>);
                        } else {
                            renderRow.push("");
                        }

                    }
                });

                dataBody.push(renderRow);
            });
        }

        this.setState({dataBody: dataBody});
    }

    render() {
        let {dataBody} = this.state;

        if(this.dataHeader.length > 0 && dataBody && dataBody.length > 0){
            return (

                <div id="player-stats-wrapper-container">

                    <TableScrollHorizontal colsFreeze={3} styleFreeze={{width: "32%"}} styleScroll={{width: "68%"}} header={this.dataHeader} headerStyle={{color: '#4a4a4a'}} body={dataBody} />
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

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
import * as Service from  "../../../../services/statistic-player-services";

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
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let {sportID, currentTab} = nextProps;
        let isField = (sportID == SportConstant.BASEBALL_ID && currentTab == 3) ? true : false;

        if (isField && nextProps.currentTab !== this.props.currentTab && this.state.currentSort == "order") {

            this.setState({
                sort: {numb: true, name: false, order: false},
                currentSort: "numb",
            });
        }
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

        if(!_.isEqual(prevState.sort, this.state.sort)) {
            this.parseHeaderData();
            this.renderBody();
        }
    }

    parseData() {
        const {currentSort} = this.state;
        const {statisticsDefinitions, dataPlayer, arrPerPerson, currentTab, sportID} = this.props;

        if(!statisticsDefinitions || !dataPlayer || !arrPerPerson || !currentTab || !sportID) return false;

        this.parseStatsData();
        this.parseFormatData();
        this.parseHeaderData();
        this.parseBodyData();
        this.sortTable(currentSort, true);
        this.renderBody();
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

    findAndReplace(string, target, replacement) {

        let i = 0, length = string.length;

        for (i; i < length; i++) {

            string = string.replace(target, replacement);

        }

        return string;
    }

    getCalculated(rowData, formula, code){

        if(!formula || formula.length < 3) return null;

        this.dataFormat.map(f => {
            if (f.code != code && f.type != "Calculated") {
                let code = "[" + f.code + "]";
                let val = rowData[f.code].val || 0;

                formula = this.findAndReplace(formula, code, val);
            }
        });

        try {
            return eval(formula);
        }
        catch(err) {
            return "";
        }
    }

    parseBodyData() {

        let {sportID, currentTab, dataPlayer} = this.props;
        let dataSource = [];
        let category = 1;

        if(!sportID || !this.dataFormat || this.dataFormat.length < 1 || !dataPlayer || !dataPlayer.players || dataPlayer.players.length < 1) return [];

        switch (currentTab)
        {
            case 1: category = "Batting"; break;
            case 2: category = "Pitching"; break;
            case 3: category = "Fielding"; break;
        }

        dataPlayer.players.map(player => {
            let dataRow = {};
            let name = player.firstName + " " + (player.middleName || "") + " " + player.lastName;

            dataRow.playerId = player.playerSfid;
            dataRow.num = player.jerseyNumber ? player.jerseyNumber : '00';
            dataRow.name = name;
            dataRow.category = category;
            dataRow.orderValue = currentTab == 1 ? player.orderNumber : player.pitchingOrderNumeber;
            dataRow.fixtureParticipantId = player.fixtureParticipantId;
            dataRow.orderError = false;
            dataRow.toggle = false;
            dataRow.isChange = false;
            dataRow.isOrderChange = false;


            this.dataFormat.map(f => {
                if (f.type == "Calculated") {

                    dataRow[f.code] = {val: f.formula, error: false, change: false};
                } else {

                    dataRow[f.code] = {val: this.getItemValue(player.playerSfid, f.code, category), error: false, change: false};

                    if(dataRow[f.code].val){
                        dataRow.toggle = true;
                    }
                }
            });

            dataSource.push(dataRow);
        });

        this.dataSource = dataSource;
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
                    code = [
                        {code: "AB", name: "AB"},
                        {code: "R", name: "R"},
                        {code: "H", name: "H"},
                        {code: "2B", name: "2B"},
                        {code: "3B", name: "3B"},
                        {code: "HR", name: "HR"},
                        {code: "RBI", name: "RBI"},
                        {code: "TB", name: "TB"},
                        {code: "BB", name: "BB"},
                        {code: "K", name: "SO(K)"},
                        {code: "SB", name: "SB"},
                        {code: "CS", name: "CS"},
                        {code: "SP", name: "SP"},
                        {code: "BA", name: "AVG"}
                    ];

                    break;
                case 2:
                    code = [
                        {code: "IP", name: "IP"},
                        {code: "H", name: "H"},
                        {code: "R", name: "R"},
                        {code: "ER", name: "ER"},
                        {code: "BB", name: "BB"},
                        {code: "K", name: "SO(K)"},
                        {code: "HR", name: "HR"}
                    ];

                    break;
                case 3:
                    code = [
                        {code: "E", name: "E"},
                        {code: "A", name: "A"},
                        {code: "PO", name: "PO"}
                    ];

                    break;
            }
        }else {
            code = [
                {code: "AB", name: "AB"},
                {code: "R", name: "R"},
                {code: "HR", name: "HR"},
                {code: "RBI", name: "RBI"},
                {code: "TB", name: "TB"},
                {code: "BB", name: "BB"},
                {code: "K", name: "SO(K)"},
                {code: "SB", name: "SB"},
                {code: "CS", name: "CS"}
            ];
        }

        for(let i = 0; i < code.length; i++) {
            let c = code[i];

            for (let j = 0; j < statisticsDefinitions.length; j++) {
                let s = statisticsDefinitions[j];

                if(c.code == s.code) {
                    dataFormat.push({code: c.code, name: c.name, type: s.type, formula: s.formula});
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
        const onSortClick = (id, active) => this.onSortClick(id, active);

        if(sportID == SportConstant.BASEBALL_ID) {
            switch (currentTab){
                case 1:
                case 2:
                    dataHeader.push(<SortIcon text={"#"} id={'numb'} active={sort.numb} onClick={onSortClick}/>);
                    dataHeader.push(<SortIcon text={"NAME"} id={'name'} active={sort.name} onClick={onSortClick}/>);
                    dataHeader.push(<SortIcon text={"ORDER"} id={'order'} active={sort.order} onClick={onSortClick}/>);
                    break;
                case 3:
                    dataHeader.push(<SortIcon text={"#"} id={'numb'} active={sort.numb} onClick={onSortClick}/>);
                    dataHeader.push(<SortIcon text={"NAME"} id={'name'} active={sort.name} onClick={onSortClick}/>);
                    dataHeader.push("FIELDED");
                    break;
            }
        }else {
            dataHeader.push(<SortIcon text={"#"} id={'numb'} active={sort.numb} onClick={onSortClick}/>);
            dataHeader.push(<SortIcon text={"NAME"} id={'name'} active={sort.name} onClick={onSortClick}/>);
            dataHeader.push(<SortIcon text={"ORDER"} id={'order'} active={sort.order} onClick={onSortClick}/>);
        }

        this.dataFormat.map(f => {
            dataHeader.push(f.name);
        });

        this.dataHeader = dataHeader;
    }

    checkValid() {
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

            this.dataFormat.map(f => {
                if (f.type != "Calculated" && d[f.code].val) {
                    let val = parseFloat(d[f.code].val);
                    let obj = d[f.code];

                    obj.error = false;

                    if(isNaN(val)) {
                        obj.error = true;
                        found = true;
                    }

                    d[f.code] = obj;
                }
            });

            return d;
        });

        return found;
    }

    onConfirmOrderEmpty(playerId) {

        this.dataSource.map(row => {
            let newRow = row;

            if (row.playerId == playerId) {
                newRow.orderValue = '';

                this.dataFormat.map(f => {
                    newRow[f.code] = {val: '', error: false, change: false};
                });

                newRow.isChange = false;
                newRow.isOrderChange = false;
            }

            return newRow;
        });

        this.checkValid();

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    onChangeOrder(playerId, value) {

        this.dataSource.map(row => {
            let newRow = row;
            let isConfirm = false;

            if (row.playerId == playerId) {
                const orderValue = parseInt(row.orderValue) || 0;

                if((!value || value.length == 0) && this.props.onShowDailogToggle && orderValue > 0 && row.isChange) {
                    isConfirm = true;
                    const onAccept = () => this.onConfirmOrderEmpty(playerId);

                    this.props.onShowDailogToggle(2, onAccept);
                }

                if (!isConfirm) {
                    newRow.orderError = false;
                    newRow.isOrderChange = true;
                    newRow.orderValue = value;
                }
            }

            return newRow;
        });

        this.checkValid();

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    checkChange(){

        let arrParam = [];
        let arrOrderParam = [];
        this.dataSource.map(row => {

            if (row.isChange == true || row.isOrderChange == true) {

                this.dataFormat.map(f => {
                    let obj = {
                        fixture_participant_id: row.fixtureParticipantId, //321671, // row.playerId,
                        category: row.category,
                        code: f.code,
                        value: parseFloat(row[f.code].val)

                    };
                    arrParam.push(obj);

                });


                let objOrder = {
                    fixture_participant_id:  row.fixtureParticipantId,
                    category: row.category,
                    order: parseInt(row.orderValue),


                };
                arrOrderParam.push(objOrder);

            }

        });
        if(arrParam.length > 0 || arrOrderParam.length > 0){
            return true;
        }
        return false;
    }

    onSaved(){

        if(this.checkValid()) {

            if(this.props.onShowToast){
                this.props.onShowToast(3);
            }
        }else{

            if(this.props.showLoading) this.props.showLoading(true);

            let arrParam = [];
            let arrOrderParam = [];
            this.dataSource.map(row => {

                if (row.isChange == true || row.isOrderChange == true) {

                    this.dataFormat.map(f => {
                        let obj = {
                            fixture_participant_id: row.fixtureParticipantId, //321671, // row.playerId,
                            category: row.category,
                            code: f.code,
                            value: parseFloat(row[f.code].val)

                        };
                        arrParam.push(obj);

                    });


                    let objOrder = {
                        fixture_participant_id:  row.fixtureParticipantId,
                        category: row.category,
                        order: parseInt(row.orderValue),


                    };
                    arrOrderParam.push(objOrder);

                }

            });
            //save order
            let {sportID, currentTab,canvasParam} = this.props;
            let sportName = canvasParam.sport_id;
            let seasonID = canvasParam.season_id;
            let compID = canvasParam.comp_id;
            let divID = canvasParam.div_id;
            let roundID = canvasParam.round_id;
            let fixtureID = canvasParam.fixture_id;

            let isField = (sportID == SportConstant.BASEBALL_ID && currentTab == 3) ? true : false;
            if(!isField){
                if(arrOrderParam.length > 0 ) {
                    Service.saveOrder(sportName, seasonID, compID, divID, roundID, fixtureID, arrOrderParam).then(data => {
                        if(arrParam.length > 0 ){

                            Service.savePlayer(sportName,seasonID,compID, divID, roundID, fixtureID,arrParam).then(data => {

                                if(this.props.showLoading) this.props.showLoading(false);

                                if(this.props.onShowToast){
                                    this.props.onShowToast(1);
                                }


                                if(this.props.onRefreshStats) this.props.onRefreshStats();
                                if(this.props.onEditStats) this.props.onEditStats(false);

                            }).catch(error => {

                                if(this.props.showLoading) this.props.showLoading(false);
                                if(this.props.onShowToast){
                                    this.props.onShowToast(2);
                                }
                            });

                        }

                    }).catch(error => {
                        if(this.props.showLoading) this.props.showLoading(false);

                        if(this.props.onShowToast){
                            this.props.onShowToast(2);
                        }
                    });
                }
            }else{
                if(arrParam.length > 0 ){

                    Service.savePlayer(sportName,seasonID,compID, divID, roundID, fixtureID,arrParam).then(data => {

                        if(this.props.showLoading) this.props.showLoading(false);

                        if(this.props.onShowToast){
                            this.props.onShowToast(1);
                        }


                        if(this.props.onRefreshStats) this.props.onRefreshStats();
                        if(this.props.onEditStats) this.props.onEditStats(false);

                    }).catch(error => {

                        if(this.props.showLoading) this.props.showLoading(false);

                        if(this.props.onShowToast){
                            this.props.onShowToast(2);
                        }
                    });

                }
            }


        }
    }

    onChangeStats(playerId, value, code) {

        this.dataSource.map(row => {
            let newRow = row;

            if(playerId == row.playerId ) {
                newRow[code] = {val: value, error: false, change: false};
                newRow.isChange = true;
            }

            return newRow;
        });

        this.checkValid();

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    sortTable (field, active) {

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
                dataSource = _.orderBy(dataSource, [( o ) => { return o.orderValue || '' ;}], [order]);
                sort.order = active;
                break;
        }

        this.dataSource = dataSource;

        this.setState({
            sort, currentSort
        });
    }

    onSortClick (field, active) {

        this.sortTable(field, active);
        this.renderBody();
    }

    onConfirmToggleOff(playerId) {

        this.dataSource.map(row => {
            let newRow = row;

            if (row.playerId == playerId) {
                newRow.toggle = false;
                newRow.isChange = false;

                this.dataFormat.map(f => {
                    newRow[f.code] = {val: '', error: false, change: false};
                });
            }

            return newRow;
        });

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    onChangeToggle(playerId) {

        this.dataSource.map(row => {
            let newRow = row;
            let isConfirm = false;

            if (row.playerId == playerId && row.toggle && this.props.onShowDailogToggle && row.isChange) {

                isConfirm = true;
                const onAccept = () => this.onConfirmToggleOff(playerId);

                this.props.onShowDailogToggle(1, onAccept);
            }

            if (row.playerId == playerId && !isConfirm) {
                newRow.toggle = !row.toggle;
            }

            return newRow;
        });

        this.renderBody();
        if(this.props.onEditStats) this.props.onEditStats(true);
    }

    renderBody() {
        let {sportID, currentTab} = this.props;
        let dataBody = [];
        let isField = (sportID == SportConstant.BASEBALL_ID && currentTab == 3) ? true : false;

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
                    let inputStyle = (row.orderError) ? inputStyleError : inputStyleNormal;

                    renderRow.push(<Integer className="order" id={row.category + row.playerId} min={1} max={999} style={inputStyle} defaultValue={row.orderValue} onBlur={onChangeOrder}/>);
                }

                this.dataFormat.map(f => {

                    if (f.type == "Calculated") {

                        if(row.orderValue) {
                            let val = this.getCalculated(row, f.formula, f.code);
                            val = parseFloat(val).toFixed(2);
                            val = isNaN(val) ? "" : val;
                            val = val == "Infinity" ? "" : val;
                            renderRow.push(<div className="calculated">{val}</div>);
                        } else {
                            renderRow.push(<div />);
                        }

                    } else {

                        if((isField && row.toggle) || (!isField && row.orderValue && parseInt(row.orderValue) > 0)){
                            let onChangeStats = (value) => this.onChangeStats(playerId, value, f.code);
                            let inputStyle = (row[f.code].error) ? inputStyleError : inputStatsNormal;

                            renderRow.push(<Float id={row.category + row.playerId} numOfDecimal={2} min={0} max={999} style={inputStyle} defaultValue={row[f.code].val} onBlur={onChangeStats}/>);
                        } else {
                            renderRow.push(<div />);
                        }

                    }
                });

                dataBody.push(renderRow);
            });
        }
        this.setState({dataBody: dataBody});
    }

    loading() {
        let {dataBody} = this.state;

        if(this.dataHeader.length > 0 && dataBody && dataBody.length > 0){
            return 1;
        }

        return -1;
    }

    render() {
        let {dataBody} = this.state;

        return (

            <div id="player-stats-wrapper-container">

                {this.loading() > 0 && <TableScrollHorizontal colsFreeze={3} styleFreeze={{width: "32%"}} styleScroll={{width: "68%"}} header={this.dataHeader}
                                                              headerStyle={{color: '#4a4a4a'}} body={dataBody} />}
                {this.loading() == 0 && <div className="no-stats-entry">Have no player list</div>}
                {this.loading() < 0 && <div className="no-stats-entry" />}
                <style>{css}</style>
            </div>
        );
    }
}

PlayerStatsComponent.propTypes = {
    statisticsDefinitions: PropTypes.array,
    sportID: PropTypes.number,
    currentTab: PropTypes.number,
    dataPlayer: PropTypes.object,
    arrPerPerson: PropTypes.array,
    onEditStats: PropTypes.func,
    canvasParam: PropTypes.object,
    onShowToast: PropTypes.func,
    onRefreshStats: PropTypes.func,
    onShowDailogToggle: PropTypes.func,
    showLoading: PropTypes.func,
};

PlayerStatsComponent.defaultProps = {
    currentTab: 1,
};

const inputStyleError = {border: "1px solid rgb(244, 66, 66)"};
const inputStyleNormal = {border: "1px solid rgb(0, 151, 222)"};
const inputStatsNormal = {border: "1px solid rgb(216, 216, 216)"};
const css = `
    #player-stats-wrapper-container { 
        background-color: rgba(241,245,248,1);
    }
    
    #player-stats-wrapper-container table {
        border-spacing: 0;
        border-collapse: collapse;
    }
    
    #player-stats-wrapper-container .no-stats-entry {
        text-align: center;
        padding: 100px;
        background-color: white;
    }
    
    #player-stats-wrapper-container .calculated {
        font-weight: bold;
        font-size: 15px;
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
        min-width: 60px;
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
        -webkit-border-radius: 2px;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        background: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    
    #player-stats-wrapper-container input.order {
        border: 1px solid rgb(0, 151, 222);
        color: rgb(0, 151, 222);
    }
    
    #player-stats-wrapper-container td {
        height: 54px;
        color: rgb(81, 81, 81);
        padding: 0;
        font-size: 14px;
        font-family: Roboto;
        background-color: transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        background: transparent;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
        min-width: 60px;
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

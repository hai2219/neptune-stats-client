/**
 * Created by long on 5/3/17.
 */
"use strict";

import React, {Component} from "react";
import TableComponent from  '../../../common/table/table-component';
import SortIcon from '../../../common/icon/sort-icon-component';
import IntegerNumber from '../../../common/input/integer-number-component';
import ToggleComponent from '../../../common/toggle/toggle-button-component';


export default class PlayerStatsComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {

        };

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }


    render() {

        let headerData = [
            <SortIcon text={"#"} key={16}/>,
            <SortIcon text={"NAME"} key={17}/>,
            <SortIcon text={"ORDER"} key={18}/>,
            "FIELDED",
            "AB",
            "R",
            "H",
            "2B",
            "3B",
            "HR",
            "RB1",
            "TB",
            "BB",
            "SO",
            "SB",
            "CS",
            "SP",
            "AVG"
        ];
        let bodyData = [
            ["01", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["02", "Issau Rave", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["03", "Sandran Muc", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["04", "Bati Huci", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["06", "Doti Hane", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["09", "Pharan Candia", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent isChecked={false} key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["19", "Not tival", <IntegerNumber key={1} className="order" defaultValue={3} min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={3} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={4}  defaultValue={3}/>, <IntegerNumber min={0} max={999}  key={5} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={6} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={7} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={8} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={9} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={10} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={11} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={12} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={13} defaultValue={3} />, <IntegerNumber min={0} max={999}  key={14} defaultValue={3} />, "3"],
            ["11", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["31", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["34", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["56", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["32", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["87", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["41", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
            ["54", "Sarah Love", <IntegerNumber key={1} className="order" min={1} max={999}/>, <ToggleComponent key={15}/>, <IntegerNumber min={0} max={999}  key={2} />, <IntegerNumber min={0} max={999}  key={3} />, <IntegerNumber min={0} max={999}  key={4} />, <IntegerNumber min={0} max={999}  key={5} />, <IntegerNumber min={0} max={999}  key={6} />, <IntegerNumber min={0} max={999}  key={7} />, <IntegerNumber min={0} max={999}  key={8} />, <IntegerNumber min={0} max={999}  key={9} />, <IntegerNumber min={0} max={999}  key={10} />, <IntegerNumber min={0} max={999}  key={11} />, <IntegerNumber min={0} max={999}  key={12} />, <IntegerNumber min={0} max={999}  key={13} />, <IntegerNumber min={0} max={999}  key={14} />, "2.3"],
        ];

        return (

            <div id="player-stats-wrapper-container">

                <TableComponent header={headerData} headerStyle={{color: '#4a4a4a'}} body={bodyData} />
                <style>{css}</style>
            </div>

        );

    }
}

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
    
    #player-stats-wrapper-container tr:nth-child(odd) td {
        background: #fbfbfc;
    }
    
    #player-stats-wrapper-container tr td:nth-child(1) {
        width: 50px;
    }
    
    #player-stats-wrapper-container tr td:nth-child(2) {
        width: 130px;
        text-align: left;
    }
    #player-stats-wrapper-container tr th:nth-child(2) {
        text-align: left;
    }
   
    #player-stats-wrapper-container tr td:nth-child(3) {
        width: 100px;
    }
    
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

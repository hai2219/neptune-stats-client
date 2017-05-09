/**
 * Created by long on 5/3/17.
 */
"use strict";

import React, {Component} from "react";
import TableComponent from  '../../../common/table/table-component';
import SortIcon from '../../../common/icon/sort-icon-component';
import Integer from '../../../common/input/input-integer-component';
import Float from '../../../common/input/input-float-component';
import ToggleComponent from '../../../common/toggle/toggle-button-component';
import PropTypes from 'prop-types';

export default class PlayerStatsComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            currentTab: this.props.currentTab,
            dataPlayer: this.props.dataPlayer,
            statisticsDefinitions: this.props.statisticsDefinitions,
            arrPerPerson: this.props.arrPerPerson,
        };

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    componentWillReceiveProps(nextProps){

        this.setState({
            currentTab:nextProps.currentTab,
            dataPlayer:nextProps.dataPlayer,
            statisticsDefinitions:nextProps.statisticsDefinitions,
            arrPerPerson:nextProps.arrPerPerson,
        });

    }

    getFormat(key){
        let format = {"code":key,"type":"Entry","formula":null};
        for (let i = 0 ; i < this.state.statisticsDefinitions.length; i++){
            let temp = this.state.statisticsDefinitions[i];
             if(key == temp.code){
                 return temp;
             }
        }
        return format;
    }

     getItemValue(playerSfId, code, category){

       if(this.state.arrPerPerson){
           for(let i= 0 ; i < this.state.arrPerPerson.length; i++){
               let temp = this.state.arrPerPerson[i];
               if(temp.player == playerSfId && temp.code == code && temp.category == category){
                   console.log('playerSfId',playerSfId);
                   console.log('code',code);
                   console.log('category',category);
                   return temp.value;
               }
           }
           return null;
       }
       return null;


     }

    getBodyData(arrObjectCode,category,isField){
        let bodyData = [];

        if( this.state.dataPlayer && this.state.dataPlayer.players) {
            for (let i = 0; i < this.state.dataPlayer.players.length; i++) {
                let player = this.state.dataPlayer.players[i];
                let row = [];
                row.push(player.jerseyNumber ? player.jerseyNumber : '00');
                let name = player.firstName + player.middleName + player.lastName;
                row.push(name);
                if(isField){
                    row.push(<ToggleComponent key={15}/>);
                }else{
                    row.push(<Integer key={1} className="order" min={1} max={999}/>);
                }

                for (let j = 0; j < arrObjectCode.length; j++) {
                    let temp = arrObjectCode[j];
                    if (temp.type == "Calculated") {
                        row.push("11");
                    } else {

                        let value = this.getItemValue(player.playerSfid,temp.code,category);
                       
                            row.push(<Float numOfDecimal={2} min={0} max={999} defaultValue={value} />);


                    }
                }
                bodyData.push(row);
            }
        }
        return bodyData;
    }

    render() {

        let headerData1 = [
            <SortIcon text={"#"} key={16}/>,
            <SortIcon text={"NAME"} key={17}/>,
            <SortIcon text={"ORDER"} key={18}/>,
        ];
        let arrCode1 = [  "AB",
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
            "AVG"];
        headerData1 = headerData1.concat(arrCode1);
        let arrObjectCode1 = [];
        for(let i = 0 ; i < arrCode1.length; i++){
            let temp = this.getFormat(arrCode1[i]);
            arrObjectCode1.push(temp);
        }
        let bodyData1 = this.getBodyData(arrObjectCode1,'Batting',false);


        let headerData2 = [
            <SortIcon text={"#"} key={16}/>,
            <SortIcon text={"NAME"} key={17}/>,
            <SortIcon text={"ORDER"} key={18}/>,

        ];
        let arrCode2 = [ "IP",
            "H",
            "R",
            "ER",
            "BB",
            "SO",
            "HR",
            "ERA"];
        headerData2 = headerData2.concat(arrCode2);
        let arrObjectCode2 = [];
        for(let i = 0 ; i < arrCode2.length; i++){
            let temp = this.getFormat(arrCode2[i]);
            arrObjectCode2.push(temp);
        }
        let bodyData2 = this.getBodyData(arrObjectCode2,'Pitching',false);


        let headerData3 = [
            <SortIcon text={"#"} key={16}/>,
            <SortIcon text={"NAME"} key={17}/>,
            "FIELDED",

        ];
        let arrCode3 = [
            "E",
            "A",
            "PO",
            "FPCT"
        ];
        headerData3 = headerData3.concat(arrCode3);
        let arrObjectCode3 = [];
        for(let i = 0 ; i < arrCode3.length; i++){
            let temp = this.getFormat(arrCode3[i]);
            arrObjectCode3.push(temp);
        }
        let bodyData3 = this.getBodyData(arrObjectCode3,'Fielding',true);


        let headerData = [];
        let bodyData = [];
        switch (this.state.currentTab){
            case 1:
                headerData = headerData1;
                bodyData = bodyData1;
                break;
            case 2:
                headerData = headerData2;
                bodyData = bodyData2;
                break;
            case 3:
                headerData = headerData3;
                bodyData = bodyData3;
                break;
            default:
                headerData = headerData1;
                bodyData = bodyData1;
                break;

        }
       if(bodyData.length > 0){
           return (

               <div id="player-stats-wrapper-container">

                   <TableComponent header={headerData} headerStyle={{color: '#4a4a4a'}} body={bodyData} />
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
    arrPerPerson: PropTypes.object,
};

PlayerStatsComponent.defaultProps = {
    sportID: 7,
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

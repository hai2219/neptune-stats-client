/**
 * Created by long on 5/3/17.
 */
"use strict";

import React, {Component} from "react";
import PlayerStatsComponent from "../wrapper/statistics-player/player-stats-component/player-stats-component";
import  HeaderComponent from  "../wrapper/statistics-player/header-component/header-wrapper-component";
import  FooterComponent from  "../wrapper/statistics-player/footer-component/footer-wrapper-component";
import ModalComponent from "../../components/common/modal/modal-component";
import PopupComponent from "../../components/common/popup/popup-no-internet-component";
import * as SportConstant from "../../constant/sport-constant";
import * as Service from  "../../services/statistic-player-services";

export default class PlayerStatsPageComponent extends Component {
    constructor(props) {


        super(props);
        this.state = {
            dataSource: [],
            isShowPopup:false,
            isShowModel:false,
            isShowModelLeaveTab:false,
            submitResult:true,
            statisticsDefinitions:[],
            dataPlayer:null,
            arrPerPerson:null,
            currentTab:1,
        };
        this.currentTab = 1;
        this.isEditStats = true;
    }

    componentDidMount() {


        let canvasParam = this.getCanvasParam();
        if(canvasParam){
            //save person
            let dataObject = [{
                fixture_participant_id:  1233,
                category: 'Batting',
                code: 'R',
                value: 1
            },{
                fixture_participant_id:  1244,
                category: 'Fielding',
                code: 'H',
                value: 3
            },{
                fixture_participant_id:  1773,
                category: 'Pitching',
                code: 'R',
                value: 8
            }];
            let sportID = canvasParam.sport_id;
            let seasonID = canvasParam.season_id;
            let compID = canvasParam.comp_id;
            let divID = canvasParam.div_id;
            let roundID = canvasParam.round_id;
            let fixtureID = canvasParam.fixture_id;
            let fixtureteam = canvasParam.fixtureteam_id;
            let fixtureparticipant = canvasParam.fixtureparticipant_id;
            let team = canvasParam.team_id;
            let category = '';
            let stat_code = null;


            //get statistic definition


            Service.getFormat(seasonID, compID).then(data => {
                console.log('getFormat',data);
                if (data && data.data) {
                    if(data.data.Statisticsdefinition){

                        this.setState({
                            statisticsDefinitions:data.data.Statisticsdefinition,
                        });
                    }else{
                        this.setState({
                            statisticsDefinitions:[],
                        });
                    }

                }else{
                    this.setState({
                        statisticsDefinitions:[],
                    });
                }


            })

            //get player

            Service.getPlayer(seasonID,compID,divID, roundID, fixtureID, team).then(data => {
                console.log('getPlayer',data);
                if (data.data) {
                    this.setState({
                        dataPlayer:data.data,
                    });

                }else{
                    this.setState({
                        dataPlayer:null,
                    });
                }


            })


            //get perPlayer

            Service.getIndividualPlayer(sportID,seasonID,compID, divID, roundID, fixtureID, fixtureteam, fixtureparticipant, category, stat_code).then(data => {
                console.log('getIndividualPlayer',data);
                if (data) {
                    this.setState({
                        arrPerPerson:data,
                    });

                }else{
                    this.setState({
                        arrPerPerson:null,
                    });
                }


            })

        }

    }

    componentWillUnmount(){

    }

    getCanvasParam() {
        const {canvas_param} = this.props;
        if(canvas_param){
            let param = (new Buffer(canvas_param, 'base64')).toString('ascii');
            let paramObj = JSON.parse(param);
            if (paramObj) {
                // console.log('paramObj',paramObj);
                return paramObj;
            }
        }

        return null;
    }

    onSave() {
        this.setState({
            isShowModel:true,
        })

    }

    onEditStats(isEdit) {
        this.isEditStats = isEdit || false;
    }

    onChange(data) {
        this.setState({dataSource: data});
    }

    onClickTab(index) {
        if(this.state.currentTab != index){

            this.currentTab = index;
            if(this.isEditStats){
                document.body.style.overflow = 'hidden';
                this.setState({isShowModelLeaveTab: true});
            }else{
                // this.setState({currentTab: index});
                this.goToTab(index);
            }
        }

    }

    cancelConfirm() {
        this.setState({isShowModel: false});

    }

    yesConfirm() {
        this.setState({isShowModel: false});
        this.refs.playerStats.onSaved();
    }

    cancelLeaveTab() {
        document.body.style.overflow = 'auto';
        this.setState({isShowModelLeaveTab: false});

    }

    yesLeaveTab() {
        document.body.style.overflow = 'auto';
        this.goToTab(this.currentTab);
    }

    goToTab(index){
        console.log('currentTabItem',index);
        this.refs.header.onChangeTab();
        this.setState({isShowModelLeaveTab: false ,currentTab:  index});

    }

    renderPopup(){

        let fail = " Player Stats haven't been saved.";
        let success = " Player Stats have been saved.";
        let failSpan = "Unsuccessful.";
        let successSpan = "Successful.";
        let content = this.state.submitResult ?  success : fail;
        let spanContent = this.state.submitResult ? successSpan :  failSpan;

        let spanStyle = {
            fontWeight: 'bold',
            marginLeft: '20px',

        };
        let styleSuccess = {
            height: '72px',
            fontSize: '20px',
            fontFamily: 'Roboto',
            lineHeight: '72px',
            textAlign: 'left',
            backgroundColor: 'rgba(0,173,85,1)',
        };
        let styleFail = {
            height: '72px',
            fontSize: '20px',
            fontFamily: 'Roboto',
            lineHeight: '72px',
            textAlign: 'left',
            backgroundColor: 'rgba(212,0,20,1)',
        };
        let style = this.state.submitResult ? styleSuccess : styleFail;

        return(
            <div>
                <PopupComponent
                    content={content}
                    spanContent={spanContent}
                    spanStyle={spanStyle}
                    style={style}
                    isOnline={!this.state.isShowPopup}
                />
                <style>{css}</style>
            </div>
        );

    }

    renderModel(){
        if(this.state.isShowModel){
            let title = 'CONFIRMATION';
            let question = 'Are you sure you want to save these scores?';

            let cancelConfirm = ()=> this.cancelConfirm();
            let yesConfirm = ()=> this.yesConfirm();
            return(
                <div>
                    <ModalComponent title={title} question={question}
                                    cancelConfirm={cancelConfirm} yesConfirm={yesConfirm}/>
                    <style>{css}</style>
                </div>
            );
        }
        return null;
    }

    renderModelLeaveTab(){
        if(this.state.isShowModelLeaveTab){
            let title = 'Do you want to leave this tab?';
            let question = 'Changes you made may not be saved.';

            let cancelConfirm = ()=> this.cancelLeaveTab();
            let yesConfirm = ()=> this.yesLeaveTab();
            return(
                <div>
                    <ModalComponent
                        title={title}
                        question={question}
                        cancel="Stay"
                        yes="Leave"
                        cancelConfirm={cancelConfirm} yesConfirm={yesConfirm}/>
                    <style>{css}</style>
                </div>
            );
        }
        return null;
    }


    render() {
        let canvasParam = this.getCanvasParam();
        if(canvasParam) {

            let onSave = ()=> this.onSave();
            let onChange = (data)=> this.onChange(data);
            let onEditStats = (isEdit)=> this.onEditStats(isEdit);
            let onClickTab = (index)=> this.onClickTab(index);

        return (
            <div className="statistics-player-container">
                {this.renderPopup()}
                {this.renderModel()}
                {this.renderModelLeaveTab()}
                <HeaderComponent
                                ref = "header"
                                onSave={onSave}
                                onClickTab={onClickTab}
                />
                <PlayerStatsComponent sportID = {SportConstant.BASEBALL_ID}
                                      onChange={onChange}
                                      statisticsDefinitions={this.state.statisticsDefinitions}
                                      currentTab={this.state.currentTab}
                                      dataPlayer={this.state.dataPlayer}
                                      arrPerPerson={this.state.arrPerPerson}
                                      onEditStats={onEditStats}
                                      canvasParam={canvasParam}
                                      ref = "playerStats"
                />
                <FooterComponent onSave={onSave} />
                <style>{css}</style>
            </div>

            );
        }else{
            return null;
        }

    }




}

const css = `
 
  .statistics-player-container {
        width:100%;
        height:100%;
        background-color:  rgba(241,245,248,1);

    }
    
      p.internetLostText{
      line-height:72px;
     
    }
    
     i.fa-times,.fa-times-circle{
      font-size: 20px;
      top:24px;   
      right:20px;
    }
    
     .modal-container{
        width: 354px;
        height: 212px;
        margin: 40% auto;
     }
     
      .title{
        font-size: 24px;
        font-family: Roboto;
        color:  rgba(3,3,3,1);
        margin-bottom: 16px;
        margin-top: 8px;
     }
      .question{
         font-size:20px;
         line-height: 26px;
         color:  rgba(3,3,3,1);
         margin-left: 28px;
         margin-right: 28px;
     }
     
      .top-modal{
           padding-bottom: 26px;
     }
      .cancel-btn{  
         color: rgba(0,154,222,1);
         font-size: 20px;
         font-family: Roboto;
         height: 60px;
     }
     .yes-btn{
         color: rgba(0,154,222,1);
         font-size: 20px;
         text-transform: uppercase;
         font-family: Roboto;
          height: 60px;
     }
     
      @media all and (orientation:landscape) { 
       .modal-container{
        width: 354px;
        height:  212px;
        margin: 20% auto;
     }
     }
     
`;

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
import * as Service from  "../../services/statistic-player-services";

export default class PlayerStatsPageComponent extends Component {
    constructor(props) {


        super(props);
        this.state = {
            dataSource: [],
            isShowPopup:false,
            isShowModel:false,
            submitResult:true,
            statisticsDefinitions:[],
            dataPlayer:null,
            currentTab:0,
        };
    }

    componentDidMount() {


        //get statistic definition
        let competitionId = "a0Ap0000004douyEAA";
        let season = "a2Cp0000000AdmdEAC";

        Service.getFormat(season, competitionId).then(data => {
            //console.log(data);
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


        }).catch(error => {
            this.setState({
                statisticsDefinitions:[],
            });
        });

        //get player

        let division = "a0Ap0000004g9eZEAQ";
        let round = 9826;
        let fixture = 54514;
        Service.getPlayer(season,competitionId,division, round, fixture).then(data => {
            //console.log(data);
            if (data.data) {
                this.setState({
                    dataPlayer:data.data,
                    });

            }else{
                this.setState({
                    dataPlayer:null,
                });
            }


        }).catch(error => {
            this.setState({
                dataPlayer:null,
            });
        });


    }

    componentWillUnmount(){

    }

    onSave() {
        // this.setState({
        //     isShowPopup:true,
        // })

    }

    onChange(data) {
        this.setState({dataSource: data});
    }

    onChangeTab(index) {
        this.setState({currentTab: index});
    }

    cancelConfirm() {

        this.setState({isShowModel: false});

    }

    yesConfirm() {
        this.setState({isShowModel: false});
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

    render() {

        let onSave = ()=> this.onSave();
        let onChange = (data)=> this.onChange(data);
        let onChangeTab = (index)=> this.onChangeTab(index);

        return (
            <div className="statistics-player-container">
                {this.renderPopup()}
                {this.renderModel()}
                <HeaderComponent onSave={onSave}
                                 onChangeTab={onChangeTab}
                />
                <PlayerStatsComponent onChange={onChange}
                                      statisticsDefinitions={this.state.statisticsDefinitions}
                                      currentTab={this.state.currentTab}
                                      dataPlayer={this.state.dataPlayer}
                />
                <FooterComponent onSave={onSave} />
                <style>{css}</style>
            </div>

        );

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

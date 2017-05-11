/**
 * Created by long on 5/3/17.
 */
import React, {Component} from "react";
import Tabbar from  '../../../common/tab/tab-bar-component';
import PropTypes from 'prop-types';

export default class HeaderTabbarComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            currentTab: 1
        };

        this.tabItems=[
                {id:1, label: (<span>Batting</span>), selected: true},
               { id:2, label: (<span>Pitching</span>), selected: false},
                { id:3, label: (<span>Fielding</span>), selected: false}
            ];
        this.currentTabItem =  this.tabItems[0];

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    onClick(item){

        this.currentTabItem = item;
        if(this.props.onClickTab){
            this.props.onClickTab( this.currentTabItem.id);
        }
        // console.log('currentTabItem',this.currentTabItem.id);
    }

    onChangeTab(){
        // console.log(' this.currentTabItem.id', this.currentTabItem.id);
        this.tabItems.map(n=>{
            n.selected = (n.id ==  this.currentTabItem.id)? true : false;
            return n;
        });

        this.setState({
            currentTab:  this.currentTabItem.id
        });

        if(this.props.onChangeTab){
            this.props.onChangeTab( this.currentTabItem.id);
        }
    }



    render() {


        const onClick = (item) => this.onClick(item);

        return (

            <div className="header-tabbar-container">
                <Tabbar tabItems={this.tabItems} onClick={onClick}    />
                <style>{css}</style>
            </div>

        );

    }

}

HeaderTabbarComponent.propTypes = {
    onClickTab: PropTypes.func,
    onChangeTab: PropTypes.func,
};

HeaderTabbarComponent.defaultProps = {

};

const css = `
 
  .header-tabbar-container { 
        background-color: rgba(241,245,248,1);
        float:left;
        width:60%;
        margin-top: 10px;
        margin-left: 28px;
       
    }
    
    .ulTab {
         background-color:rgba(241,245,248,1);
         height: 44px;
         width: inherit;
    }
    
    .ulTab li{ 
        height: 44px;
        width: 166px;
        border: 1px solid rgba(0,154,222,1) ;
        border-right: 0px;
    }
    
     .ulTab li a{
        font-family: Roboto;
        font-size: 16px;
        color: rgba(0,154,222,1);
        text-transform: none;
         
    }
    
    .ulTab li:first-child{
      
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    
     .ulTab li:last-child{ 
      border-right: 1px solid rgba(0,154,222,1) ;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    
    
    
    .ulTab li.active{
      background-color:rgba(0,154,222,1);
      color: rgba(241,245,248,1);
    }
   
     .ulTab li.active a{ 
      color: rgba(241,245,248,1);
      text-transform: none;
    }
   
`;

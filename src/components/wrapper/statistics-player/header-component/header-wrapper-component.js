/**
 * Created by long on 5/3/17.
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';
import Tabbar from  './header-tabbar-component';
import  Button from  '../../../common/button/button-component';



export default class HeaderWrapperComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {

        };

    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    onClick(){
        if(this.props.onSave){
            this.props.onSave();
        }
    }

    onClickTab(index){
        if(this.props.onClickTab){
            this.props.onClickTab(index);
        }
    }

    onChangeTab(){
        if(this.refs.tabbar){
            this.refs.tabbar.onChangeTab();
        }

    }

    renderTabbar(){
        const onClickTab = (index) => this.onClickTab(index);
        return (
            <Tabbar
                ref = "tabbar"
                onClickTab={onClickTab}/>
        );
    }

    render() {

        let buttonStyle = {
               float:'right',
               width:'30%',
               height: '46px',
               align: 'center',
               fontFamily: 'Roboto',
               fontWeight: '300',
               fontSize: '15px',
               color:'rgba(241,245,248,1)',
               backgroundColor: 'rgba(0,154,222,1)',
               borderRadius: '4px',
               marginTop: '26px',
               marginRight: '28px',
        };

        const onClick = () => this.onClick();

        return (
            <div className="header-wrapper-container">
                {this.renderTabbar()}
                <Button
                    onClick={onClick}
                    text="Update & Save Player Stats"
                    style={buttonStyle}
                />
                <style>{css}</style>
            </div>

        );

    }

}

HeaderWrapperComponent.propTypes = {
    onSave: PropTypes.func,
    onClickTab: PropTypes.func,
};

HeaderWrapperComponent.defaultProps = {

};

const css = `
 
  .header-wrapper-container {
        width:100%;
        height: 100px; 
        background-color:  rgba(241,245,248,1);
        

    }
   
`;

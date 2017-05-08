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

    onChangeTab(index){
        if(this.props.onChangeTab){
            this.props.onChangeTab(index);
        }
    }

    renderTabbar(){
        const onChangeTab = (index) => this.onChangeTab(index);
        return (
            <Tabbar
                onChangeTab={onChangeTab}/>
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
    onChangeTab: PropTypes.func,
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

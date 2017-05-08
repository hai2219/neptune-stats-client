/**
 * Created by long on 5/3/17.
 */
import React, {Component} from "react";
import  Button from  '../../../common/button/button-component';
import PropTypes from 'prop-types';


export default class FooterWrapperComponent extends Component {
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
               marginTop: '16px',
               marginRight: '28px',
        };

        const onClick = () => this.onClick();

        return (
            <div className="footer-wrapper-container">
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

FooterWrapperComponent.propTypes = {
    onSave: PropTypes.func,
};

FooterWrapperComponent.defaultProps = {

};

const css = `
 
  .footer-wrapper-container {
        width:100%;
        height: 73px;
        background-color:   rgba(241,245,248,1);
        

    }
   
`;

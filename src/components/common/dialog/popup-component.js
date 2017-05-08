/**
 * The Popup component
 *
 * @author rocachien
 * @company NEXLE
 * @create 2017/02/09 14:44
 * @update 2017/02/10 14:44
 * @file common/dialog/popup-component.js
 *
 * @param title: String
 * @param content: Object
 * @param onClose: Function
 * @param perHeight: Number
 * @param bColor: String
 * @param tColor: String
 *
 */
"use strict";

import React, {Component, PropTypes} from "react";

export default class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.hide = this.hide.bind(this);

    }

    show() {


        if(window && window.scrollOff) window.scrollOff();
        this.setState({visible: true});

    }

    hide() {


        if(window && window.scrollOn) window.scrollOn();

        this.setState({visible: false});

        if (this.props.onClose) this.props.onClose();

    }

    render() {


        let perHeight = this.props.perHeight;
        let marginTop = parseInt((100 - perHeight) / 2) - 2;
        let style = {height: perHeight + "%", top: marginTop + "%"};

        if (this.state.visible) {
            return (
                <div className="popupContainer">
                    <div className="popupBackground"/>
                    <div className="popupView" style={style}>
                        <div className="popupTitleBar" style={{backgroundColor: this.props.bColor}}>
                            <div className="popupTile" style={{color: this.props.tColor}}>{this.props.title}</div>
                            <a onClick={this.hide} className="dialog-toggle closePopup">×</a>
                        </div>
                        <div className="popupContent">{this.props.content}</div>
                    </div>
                    <style>{css}</style>
                </div>
            );
        }
        return false;

    }
}

Popup.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object,
    onClose: PropTypes.func,
    perHeight: PropTypes.number,
    bColor: PropTypes.string,
    tColor: PropTypes.string,
};
Popup.defaultTypes = {
    title: "",
    perHeight: 20,
    content: false,
    bColor: "#fcd000",
    tColor: "white"
};

const css = `
    .popupContainer {
        width:100%;
        height:100%;
        position: fixed;
        z-index: 1998;
        top: 0;
        right: 0;
    }
    
    .popupBackground {
        width:100%;
        height:100%;
        position: fixed;
        z-index: 1999;
        top: 0;
        right: 0;
      
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-transition: all .35s ease-in-out;      
        transition: all .35s ease-in-out;
        
        background-color: black;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
        filter: alpha(opacity=60);
        opacity: 0.6;
        -moz-opacity: 0.6;
        -khtml-opacity: 0.6;
    }
    
    .popupView {    
        width: 80%;
        border-radius: 5px;
        min-height: 30%;
        margin-left: 10%;
        overflow: hidden;
        position: fixed;
        z-index: 2000;
        background: white;
    }

    .popupTitleBar{
        width: 100%;
        height:40px;
        background: #fcd000;
    }
    
    .popupTile{
        float: left;
        color: black;
        margin: 10px 5px 0 10px;
        font-weight: bold;
    }
    
    .closePopup {
        float: right;
        margin: 6px;
        padding: 5px 8px;
        background: rgba(0,0,0,0.7);
        color: white;
        font-size: 20px;
        line-height: 16px;
        border-radius: 4px;
        text-decoration: none;
    }
    
    .popupContent {
        padding: 5px 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        height: 80%;
    }
    
`;

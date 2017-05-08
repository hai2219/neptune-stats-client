/**
 *
 */

'use strict';

import React, {Component, PropTypes} from "react";

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false
        };

        this.hide = this.hide.bind(this);
        this.close = this.close.bind(this);
    }

    show() {
        this.setState({dialogVisible: true});
        if(window.scrollOff) window.scrollOff();
    }

    hide() {
        this.setState({dialogVisible: false});
        if(window.scrollOn) window.scrollOn();
    }

    close() {
        if(window.scrollOn) window.scrollOn();
        this.setState({dialogVisible: false});
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        const {dialogVisible} = this.state;
        const {title, content} = this.props;
        if (dialogVisible) {
            return (
                <div className="dialogContainer">
                    <div className="dialogTitleBar">
                        <div className="dialogTile">{title}</div>
                        <a onClick={this.close} className="dialog-toggle close-dialog">×</a>
                    </div>
                    {content}
                    <style>{css}</style>
                </div>
            );
        }
        return false;
    }
}

Dialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object,
    onClose: PropTypes.func
};

const css = `.dialogContainer {
      width:100%;
      height:100%;
      position: fixed;
      z-index: 120;
      top: 0;
      right: 0;
      background-color: #343434;
      color: #fff;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-transition: all .35s ease-in-out;
      transition: all .35s ease-in-out;
    }
    
    .dialogTitleBar{
      width: 100%;
      height:52px;
      border-bottom: 1px solid #4e4e4e;
    }
    
    .dialogTile {
      float: left;
      padding: 20px 26px;
      font-size: 14px;
      font-weight: 400;
    }
    
    .close-dialog {
        float: right;
        margin: 6px;
        padding: 0px 10px 5px 10px;
        background: rgba(0,0,0,.7);
        color: #fff;
        font-size: 30px;
        line-height: 30px;
        font-weight: 300;
        border-radius: 3px;
        text-decoration: none;
    }`;

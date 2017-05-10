/**
 * Created by long on 3/24/17.
 */
import React, {PropTypes} from "react";


export default class PopUpComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isHide: false,
        };
    }

    cancel(props) {
        const {cancelConfirm} = props;
        if (cancelConfirm) {
            cancelConfirm();
        }
        this.setState({
            isHide: true,
        });
    }

    yes(props) {
        const {yesConfirm} = props;
        if (yesConfirm) {
            yesConfirm();
        }
        this.setState({
            isHide: true,
        });
    }

    renderPopup() {
        if (this.state.isHide == true) {
            return null;
        } else {
            const {title, question, containerStyle}=this.props;
            let handleCancel = () => this.cancel(this.props);
            let handleYes = () => this.yes(this.props);
            return (
                <div className="modal-wrapper">
                    <div className="modal-container" style={containerStyle}>
                        <div className="top-modal">
                            <p className="title">
                                {title ? title : ''}
                            </p>
                            <p className="question">
                                {question ? question : ''}
                            </p>
                        </div>
                        <div className="bottom-modal">
                            <button className="cancel-btn" onClick={handleCancel}> {this.props.cancel ? this.props.cancel : "Cancel"}</button>
                            <button className="yes-btn" onClick={handleYes}>  {this.props.yes ? this.props.yes : "Yes"}</button>
                        </div>
                    </div>
                    <style>{css}</style>
                </div>
            );
        }
    }

    render() {
        return this.renderPopup();
    }
}

PopUpComponent.propTypes = {
    title: PropTypes.string,
    question: PropTypes.string,
    yesConfirm: PropTypes.func,
    cancelConfirm: PropTypes.func,
    containerStyle: PropTypes.object,
    cancel: PropTypes.string,
    yes: PropTypes.string,
};


PopUpComponent.defaultProps = {};

const css = `
     .modal-wrapper{
        background-color: rgba(0,0,0,.4);
        width: 100%;
        height: 150%;
        position: absolute;
        z-index: 9999;
     }
     .modal-container{
        width: 70%;
        background-color: rgba(255,255,255,.95);
        border-radius: 12px;
        margin: 80% auto
     }
     .top-modal{
        text-align: center;
        padding: 20px 15px;
        border-bottom: 1px solid #c9c9c9;
        font-family: Roboto, sans-serif;
     }
     .title{
        font-size: 17px;
        color: #030303;
        margin-bottom: 9px;
     }
     .question{
        font-size:13px;
        line-height: 16px;
     }
     .bottom-modal{
     }
     .cancel-btn{
        text-align: center;
        width: 50%;
        color: #009ade;
        border-right: 1px solid #c9c9c9;
     }
     .yes-btn{
        font-weight: bold;
        text-align: center;
        width: 49%;
        color: #009ade;
        text-transform: uppercase;
     }
     button{
        background-color: transparent;
        border: none;
        padding: 12px 0;
        outline: 0;
     }
`;



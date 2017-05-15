/**
 * Created by long on 3/24/17.
 */
import React, {PropTypes} from "react";


export default class PopUpNoInternetComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isHide:this.props.isOnline,
        };
        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps){

            this.setState({
                isHide:nextProps.isOnline,
            });

    }

    onClick() {
        const {onClick} = this.props;
        if(onClick){
            onClick();
        }
        this.setState({
            isHide:true,
        });
    }

    renderPopup(){
        const {style, textStyle, content, spanContent, spanStyle}= this.props;
        if(this.state.isHide == true){
            return null;
        }else{
            return (
                <div className="internetLost" style={style}>
                    <p className="internetLostText" style={textStyle}>
                        <span style={spanStyle}>
                            {spanContent}
                        </span>
                        {content?content:"No Internet Connection!"}
                    </p>
                    <i className="fa fa-times-circle" aria-hidden="true" onClick={this.onClick}/>
                    <style>{css}</style>
                </div>
            );
        }
    }

    render() {
        return  this.renderPopup() ;
    }
}

PopUpNoInternetComponent.propTypes = {
    isOnline: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    spanStyle: PropTypes.object,
    content: PropTypes.string,
    spanContent: PropTypes.string,
};


PopUpNoInternetComponent.defaultProps = {
};

const css = `
    .internetLost {
      height:32px;
      color:white;
      text-align:center;
      position:absolute;
      z-index:1000;
      width:100%;
      background-color:#242424;
      -webkit-box-shadow: 0px 10px 6px -3px rgba(156,156,156,0.58);
      -moz-box-shadow: 0px 10px 6px -3px rgba(156,156,156,0.58);
      box-shadow: 0px 10px 6px -3px rgba(156,156,156,0.58);
    }
    
    p.internetLostText{
      line-height:32px;
      font-weight:400;
    }
    
    i.fa-times,.fa-times-circle{
      color:rgba(255,255,255,.55);
      position:absolute;
      top:0;   
      right:0;
      font-size: 30px;
      margin: 21px;
    }
    
`;



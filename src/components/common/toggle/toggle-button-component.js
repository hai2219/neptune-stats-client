/**
 * Created by Admin on 4/1/2017.
 */
import React, {Component, PropTypes} from "react";

export default class ToggleButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: true
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        const {onChange, id} = this.props;
        if(onChange){
            onChange(id);
        }
        let check = (e.target)?e.target.checked:false;
        this.setState({
            isCheck: (check==true||check==false)?check:!this.state.isCheck
        });
    }

    render() {
        let {isChecked, id, name, disabled} = this.props;
        return (
            <label className="switch">
                <input id={id} type="checkbox" name={name} disabled={disabled} checked={(isChecked==true||isChecked==false)?isChecked:this.state.isCheck} onChange={this.onChange}/>
                <div className="slider round"/>
                <style>{css}</style>
            </label>

        );
    }
}

ToggleButtonComponent.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    isChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    icons: PropTypes.object
};


const css = `
    .switch {
      position: relative;
      display: inline-block;
      width: 34px;
      height: 14px;
    }
    
    .switch input {display:none;}
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: -1px;
      bottom: -3px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: rgba(0,154,222,.5);
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
      
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(18px);
      -ms-transform: translateX(18px);
      transform: translateX(18px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      background-color: #f1f1f1;
      box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
      border-radius: 50%;
       -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider.round:before {
      background-color: rgb(0, 154, 222);
    }
    
    * {  
        -webkit-backface-visibility:  hidden;
        -webkit-tap-highlight-color:  transparent;
    }
`;

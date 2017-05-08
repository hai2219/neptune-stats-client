/**
 * Created by Admin on 4/1/2017.
 */
import React, {Component, PropTypes} from "react";
import Toggle from 'react-toggle';
import '../../../../node_modules/react-toggle/style.css';

export default class ToggleComponent extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(){
        const {onChange, id} = this.props;
        if(onChange){
            onChange(id);
        }
    }


    render() {
        let {isChecked, icons, id} = this.props;
        return (
            <div>
                <Toggle id={id}
                        checked={isChecked}
                        icons={icons ? icons : false}
                        onChange={this.onChange}/>
                <style>{css}</style>
            </div>
            );
    }
}

ToggleComponent.propTypes = {
    id: PropTypes.string,
    onChange: PropTypes.func,
    isChecked: PropTypes.bool,
    icons: PropTypes.object
};


ToggleComponent.defaultProps = {};

const css = `
    .react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
        -moz-box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
        -webkit-box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
        box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
    }
    .react-toggle--focus .react-toggle-thumb {
        -moz-box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
        -webkit-box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
        box-shadow: 0px 1px 1px 0px rgba(45,36,36,.24);
    }
`;

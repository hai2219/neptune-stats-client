/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/05/08 10:03
 * @update 2017/05/12 13:48
 * @file common/input/input-float-component.js
 */
"use strict";

import React, {Component} from "react";
import PropTypes from 'prop-types';

/**
 * @desc This is Input Float component.
 * @example
 *
 *
 * <Float className="finalScoreInput" id={id} ref={id} key={id} style={inputStyle} onBlur={onBlur} defaultValue={input} numOfDecimal={2} min={-999} max={999}/>
 */

const KeyCode = {
    backspace: 8,
    leftArrow: 37,
    rightArrow: 39,
    delete: 46,
    e: 69,
    dash: 189,
    subtract: 109,
    enter: 13,
    period: 190,
    decimal: 110
};
export default class Float extends Component {
    /**
     * @param {object} props.
     */
    constructor(props) {
        super(props);

        this.value = "";
    }

    _isNumber(key) {
        if(key == KeyCode.e) return false;

        if((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
            return true;
        } else {
            return false;
        }
    }

    _isMoveAndDelete(key) {
        if((key == KeyCode.backspace || key == KeyCode.delete || key == KeyCode.leftArrow || key == KeyCode.rightArrow)) {
            return true;
        } else {
            return false;
        }
    }

    _isSubtract(key) {
        if(key == KeyCode.subtract || key == KeyCode.dash) {
            return true;
        } else {
            return false;
        }
    }

    _isDecimal(key) {
        if(key == KeyCode.period || key == KeyCode.decimal) {
            return true;
        } else {
            return false;
        }
    }

    _numOfDecimal(value) {
        let decimal = (value + "").split(".")[1];

        if(decimal && decimal.length > 0) {
            return decimal.length;
        } else {
            return 0;
        }
    }

    onKeyUp(event) {
        const {numOfDecimal, min, max, id} = this.props;
        let key = event.charCode || event.keyCode;
        let val = event.target.value;
        let value = parseFloat(val);

        if(this._isSubtract(key)) {
            if(this.value.length > 0 && isNaN(value)) {
                this.refs[id].value = this.value;
                return false;
            }
            return true;
        }

        if(this._numOfDecimal(val) > numOfDecimal) {
            this.refs[id].value = this.value;
            return false;
        }

        if(value < min || value > max) {
            this.refs[id].value = this.value;
            return false;
        }

        this.value = val;
        if(val.length > 1 && !this._isMoveAndDelete(key) && !this._isDecimal(key)) this.refs[id].value = value;

        if(key == KeyCode.enter) {
            if(this.props.onBlur) this.props.onBlur(value);
        }
    }

    onKeyDown(event) {
        const {min} = this.props;
        let key = event.charCode || event.keyCode;
        let value = event.target.value;

        this.value = value;

        if(this._isMoveAndDelete(key)) {
            return true;
        }

        if(0 > min && this._isSubtract(key)) {
            return true;
        }

        if(value.length > 0 && this._isDecimal(key)) {
            if(value.indexOf(".") > 0) {
                event.stopPropagation();
                event.preventDefault();
            }

            return true;
        }

        if(this._isNumber(key)) {
            return true;
        } else {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onBlur(id) {

        let input = this.refs[id];
        let inputValue = input.value;

        if(this.props.onBlur) this.props.onBlur(inputValue);
    }

    render() {
        let {id} = this.props;
        const inputProps = Object.assign({}, this.props);
        delete inputProps.numOfDecimal;

        const onKeyDown = (event) => this.onKeyDown(event);
        const onKeyUp = (event) => this.onKeyUp(event);
        const onBlur = (event) => this.onBlur(id);

        return (
            <input {...inputProps} type={"number"} id={id} ref={id} key={id} onKeyUp={onKeyUp} onBlur={onBlur} onKeyDown={onKeyDown} />
        );
    }
}

Float.propTypes = {
    id: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    numOfDecimal: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
};

Float.defaultProps = {
    id: 'id' + Math.floor((Math.random() * 1000000000) + 999999999)
};
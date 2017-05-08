/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/04/13 16:22
 * @update 2017/04/19 13:35
 * @file common/button/filter-button-component.js
 */
"use strict";

import React, {Component, PropTypes} from "react";
import FontAwesome from 'react-fontawesome';

/**
 * @desc This is FilterButton component.
 * @example
 *
 * const onClickFilterButton = (visible) => {console.log("============= visible:", visible);};
 * <FilterButton onClick={this.onClickFilterButton} text={"FILTER"} expansion={this.state.isVisible}/>
 */

export default class FilterButton extends Component {
    /**
     * @param {object} props.
     */
    constructor(props) {
        super(props);

        this.state = {
            expansion: this.props.expansion ? true : false
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    onClick(event) {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            expansion: !this.state.expansion
        });

        if(this.props.onClick) this.props.onClick(!this.state.expansion);
    }

    render() {
        let {style, textStyle, iconStyle} = this.props;
        let onClick = (event) => this.onClick(event);
        let buttonName = this.props.text || "FILTER";

        return (
            <div className="filterButton" style={style} onClick={onClick}>
                <FontAwesome name="filter" style={textStyle} />
                <span style={textStyle}>{buttonName}</span>

                {this.state.expansion && <FontAwesome name="angle-up" style={iconStyle} />}

                {!this.state.expansion && <FontAwesome name="angle-down" style={iconStyle} />}

                <style>{css}</style>
            </div>
        );
    }
}

FilterButton.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    iconStyle: PropTypes.object,

    expansion: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func
};

FilterButton.defaultProps = {
    textStyle: {marginLeft: 5, fontSize: 19, color: 'rgb(0 154 222)'},
    iconStyle: {marginLeft: 5, fontSize: 25, color: 'rgb(0 154 222)'}
};

const css = `
    .filterButton {
        border: none;
        width: 100%;
       
    }
`;

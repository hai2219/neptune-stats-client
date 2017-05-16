/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/04/19 14:41
 * @update 2017/04/19 15:41
 * @file common/icon/sort-icon-component.js
 */
"use strict";

import React, {Component, PropTypes} from "react";
import FontAwesome from 'react-fontawesome';

/**
 * @desc This is SortIcon component.
 * @example
 *
 * const onClickFilterButton = (active) => {console.log("============= active:", active);};
 * <SortIcon key={1} text={"Sort Button"} active={true} onClick={onClickFilterButton} />
 */

export default class SortIcon extends Component {
    /**
     * @param {object} props.
     */
    constructor(props) {
        super(props);

        this.state = {
            active: this.props.active ? true : false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active != this.props.active) {
            this.setState({
                active: nextProps.active,
            });
        }
    }

    onClick(event) {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            active: !this.state.active
        });

        if(this.props.onClick) this.props.onClick(this.props.id, !this.state.active);
    }

    render() {
        let {style, textStyle, iconStyle} = this.props;
        let buttonName = this.props.text || "Sort field";
        let onClick = (event) => this.onClick(event);

        style = style ? style : {border: "none", width: "100%"};
        textStyle = textStyle ? textStyle : {color: '#4a4a4a'};
        iconStyle = iconStyle ? iconStyle : {marginLeft: 5, color: '#4a4a4a'};

        if(this.state.active) iconStyle.color = '#009ade';

        return (
            <div className="sortButton" style={style} onClick={onClick}>
                <span style={textStyle}>{buttonName}</span>
                <FontAwesome name="sort" style={iconStyle} />
            </div>
        );
    }
}

SortIcon.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    iconStyle: PropTypes.object,

    active: PropTypes.bool,
    id: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

SortIcon.defaultProps = {

};

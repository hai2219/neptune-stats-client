/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/03/08 14:44
 * @update 2017/03/15 13:20
 * @file common/icon/icon-component.js
 */
"use strict";

import React, {Component, PropTypes} from "react";

/**
 * @desc This is Icon component.
 * @example
 *
 * <Icon src= {"http://chart.apis.google.com/chart?chst=d_map_pin_shadow"} className={"className"} style={{position: "absolute"}}/>
 */

export default class Icon extends Component {
    /**
     * @param {object} props.
     */
    constructor(props) {
        super(props);
    }

    render() {
        const {src, style, className} = this.props;

        return (
            <img src={src} style={style} className={className} />
        );
    }
}

Icon.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    src: PropTypes.string
};

Icon.defaultProps = {
    style: {},
    src: null,
    className: ""
};

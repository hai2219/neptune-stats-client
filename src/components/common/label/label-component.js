/**
 *
 */
'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class LabelComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {text, style} = this.props;
        return (
            <p className="labelText" style={style}>
                {text ? text : ""}
                <style>{css}</style>
            </p>
        );
    }
}

LabelComponent.propTypes = {
    text: PropTypes.string,
    style: PropTypes.object
};

const css = `
    .labelText{
        font-size: 18px;
        font-weight: bold;
        margin: 0;
    }
`;

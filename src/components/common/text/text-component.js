/**
 *
 */
'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class TextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {text, className, style} = this.props;
        return (
            <span className={"textNormal" + className ? className : ""} style={style ? style : {}}>
                {text}
                <style>{css}</style>
            </span>
        );
    }
}

TextComponent.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

TextComponent.defaultProps = {
    text: "",
    className: "",
    style: {}
};

const css = `
    .textNormal{
        font-size:12px;
        margin-left:2px;
        
    }
`;

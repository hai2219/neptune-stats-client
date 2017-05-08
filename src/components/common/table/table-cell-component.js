/**
 * Created by Admin on 3/8/2017.
 */

"use strict";

import React, {Component, PropTypes} from "react";

export default class TableCell extends Component {

    render() {
        const {content, style} = this.props;
        return (
            <div className="cell" style={style}>{content}
                <style>{css}</style>
            </div>
        );
    }
}

TableCell.propTypes = {
    content: PropTypes.string,
    style: PropTypes.object
};

const css = `
    .cell{
        font-size:14px;
        text-align:center
    }
`;

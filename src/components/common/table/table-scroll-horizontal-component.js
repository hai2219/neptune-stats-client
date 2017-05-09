/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/05/09 14:06
 * @update 2017/05/09 14:06
 * @file common/table/table-scroll-horizontal-component.js
 */
"use strict";

import React, {Component} from "react";
import PropTypes from 'prop-types';
import TableComponent from  './table-component';

/**
 * @desc This is Table Scroll Horizontal component.
 * @example
 *
 *
 * <TableScrollHorizontal className="finalScoreInput" id={id} ref={id} style={inputStyle} onBlur={onBlur} defaultValue={input} numOfDecimal={2} min={-999} max={999}/>
 */

export default class TableScrollHorizontal extends Component {
    /**
     * @param {object} props.
     */
    constructor(props) {
        super(props);

        this.value = "";
    }

    parseFreezeHeader() {
        const {colsFreeze, header} = this.props;
        let freezeHeaderData = [];

        if(header && colsFreeze && header.length > colsFreeze) {
            header.map((head, index) => {
                if(index < colsFreeze) {
                    freezeHeaderData.push(head);
                }
            });
        }

        return freezeHeaderData;
    }

    parseFreezeBody() {
        const {colsFreeze, body} = this.props;
        let freezeBodyData = [];

        if(body && colsFreeze && body.length > colsFreeze) {
            body.map(row => {
                let newRow = [];
                row.map((b, index) => {
                    if(index < colsFreeze) {
                        newRow.push(b);
                    }
                });

                freezeBodyData.push(newRow);
            });
        }

        return freezeBodyData;
    }

    parseScrollHeader() {
        const {colsFreeze, header} = this.props;
        let scrollHeaderData = [];

        if(header && colsFreeze && header.length > colsFreeze) {
            header.map((head, index) => {
                if(index >= colsFreeze) {
                    scrollHeaderData.push(head);
                }
            });
        }

        return scrollHeaderData;
    }

    parseScrollBody() {
        const {colsFreeze, body} = this.props;
        let scrollBodyData = [];

        if(body && colsFreeze && body.length > colsFreeze) {
            body.map(row => {
                let newRow = [];
                row.map((b, index) => {
                    if(index >= colsFreeze) {
                        newRow.push(b);
                    }
                });

                scrollBodyData.push(newRow);
            });
        }

        return scrollBodyData;
    }

    renderFreeze() {
        const props = Object.assign({}, this.props);
        delete props.colsFreeze;
        delete props.styleFreeze;
        delete props.styleScroll;

        return (
            <TableComponent {...props} header={this.parseFreezeHeader()} body={this.parseFreezeBody()}/>
        );
    }

    renderScroll() {
        const props = Object.assign({}, this.props);
        delete props.colsFreeze;
        delete props.styleFreeze;
        delete props.styleScroll;

        return (
            <TableComponent {...props} header={this.parseScrollHeader()} body={this.parseScrollBody()}/>
        );
    }

    render() {
        const props = Object.assign({}, this.props);
        delete props.colsFreeze;
        delete props.styleFreeze;
        delete props.styleScroll;

        if(this.props.colsFreeze > 0) {
            return (
                <div className="horizontal-scroll-table-container">
                    <div className="horizontal-scroll-freeze" style={this.props.styleFreeze}>
                        {this.renderFreeze()}
                    </div>

                    <div className="horizontal-scroll-auto" style={this.props.styleScroll}>
                        {this.renderScroll()}
                    </div>
                    <style>{css}</style>
                </div>
            );
        } else {
            return (
                <TableComponent {...props} />
            );
        }
    }
}

TableScrollHorizontal.propTypes = {
    styleScroll: PropTypes.object,
    styleFreeze: PropTypes.object,
    colsFreeze: PropTypes.number,
};

TableScrollHorizontal.defaultProps = {
    colsFreeze: 1
};

const css = `
    .horizontal-scroll-table-container {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .horizontal-scroll-freeze {
        width: 30%;
        margin: 0;
        padding: 0;
        float: left;
    }
    .horizontal-scroll-freeze div {
        background-color: white;
    }
    .horizontal-scroll-auto {
        width: 70%;
        margin: 0;
        padding: 0;
        float: left;
        overflow-x: scroll; overflow-y: hidden;
    }
`;
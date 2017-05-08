"use strict";

import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class SortTableComponent extends Component {

    renderRow(item, index) {


        const {style, rowStyle, onClick} = this.props;
        if (item) {
            return (<tr key={index} style={rowStyle}>
                {
                    item.map((item, index)=> {
                        let handleClick = () => onClick ? onClick(index) : {};
                        let _style = (style && style[index]) ? style[index] : {};

                        return (<td key={index} onClick={handleClick} style={_style}>{item}</td>);
                    })
                }
            </tr>);
        }
        return false;

    }

    renderHeader(data) {


        const {style, headerStyle, headerColSpan} = this.props;
        if (data) {
            return data.map((item, index)=> {
                let _style = {};
                let colSpan=1;
                if(headerColSpan && headerColSpan[index]){
                    colSpan = headerColSpan[index];
                }
                if (headerStyle && headerStyle[index]) {
                    _style = headerStyle[index];
                }
                return (<th key={index} colSpan={colSpan} style={_style}
                >{item}</th>);
            });
        }
        return null;

    }

    render() {


        const {header, body, customHeaderBackgroundStyle} = this.props;
        if (body || header) {
            return (
                <div style={{overflow: 'scroll', overflowY: 'hidden'}}>
                    <table className="tableWrapper">

                        <thead style={customHeaderBackgroundStyle}>
                        <tr>
                            {
                                this.renderHeader(header)
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            body.map((row, index)=> {
                                return this.renderRow(row, index);
                            })
                        }

                        </tbody>

                        <style>{css}</style>

                    </table>
                </div>

            );
        }
        return null;

    }
}


SortTableComponent.propTypes = {
    header: PropTypes.array,
    body: PropTypes.array,
    onClick: PropTypes.func,
    style: PropTypes.array,
    rowStyle: PropTypes.object,
    headerStyle: PropTypes.array,
    headerColSpan: PropTypes.array,
    customHeaderBackgroundStyle: PropTypes.object
};

const css = `
  .tableWrapper{
    border-collapse: collapse;
    font-size: 13px;
    width: 100%; 
  }
  .tableWrapper thead{
      background-color: #fcd000;
  }
  .tableWrapper thead th{
    padding:8px;
    font-weight:normal;
    color: #00105a; 
    font-size:11px;
    text-align:center;
  }
  .tableWrapper tbody tr:nth-child(even) {background: #FFF}
  .tableWrapper tbody tr:nth-child(odd) {background: #efefef}
  .tableWrapper tbody td{
    padding:8px;
    text-align:center;
    white-space: nowrap;
    max-width: 126px;
    text-overflow: ellipsis;
    overflow: hidden;
    
  }
  .tableWrapper tbody td.name{
    text-align:left; 
    font-weight:bold;
    text-decoration: underline;
  }
  .tableWrapper thead th.name{
    text-align:left; 
  } 
    
`;


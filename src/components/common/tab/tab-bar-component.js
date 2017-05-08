/**
 * @copyright 2017 @ NEXLE
 * @author rocachien
 * @create 2017/02/24 13:56
 * @update 2017/03/06 18:42
 * @file components/common/tab/tab-bar-component.js
 */
"use strict";

import React from 'react';
import * as URLUtils from '../../../utils/url-utils';
import PropTypes from 'prop-types';
/**
 * @desc This is TabBar component.
 * @example
 *
 * onClick(item, index) {}
 *
 * renderTab(item, index){
 *
 *    return (<a onClick={onClick}><div>{item.label}</div></a>);
 * }
 *
 * <TabBar tabItems={tabItems} onClick={this.onClick} renderTab={this.renderTab} />
 */
export default class TabBar extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * @desc This is callback function when click on item
     * @param {object} event - Event of element
     * @param {object} item - Data of an item
     * @param {number} index - Index of an item
     */
    onClick(event, item, index){


        event.stopPropagation();
        event.preventDefault();

        if(this.props.onClick) return this.props.onClick(item);

        if(item && item.query){
            let query = URLUtils.query(item.query);
            URLUtils.location(query);
        }

    }

    /**
     *
     * @param {object} item - Data of an item
     * @param {number} index - Index of an item
     * @return {XML}
     */
    renderTab (item, index) {


        let selected = item.selected ? "active" : "";
        const onClick = (event) => this.onClick(event, item, index);

        if(this.props.renderTab) {
            return(
                <li key={index} className={selected} >
                    {this.props.renderTab(item, index)}
                </li>
            );
        }else {
            return(
                <li key={index} className={selected}  onClick={onClick}>
                    <a><div>{item.label}</div></a>
                </li>
            );
        }

    }

    render() {


        let tabItems = this.props.tabItems || null;

        if(!tabItems) return null;

        return (
            <div className="tabContainer" style={this.props.style}>
                <ul className="ulTab" >
                    {
                        tabItems.map((item, index) => {
                            return this.renderTab(item, index);
                        })
                    }
                </ul>
                <style>{css}</style>
            </div>
        );

    }
}

TabBar.propTypes = {
    tabItems: PropTypes.array,
    renderTab: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object
};
TabBar.defaultProps = {
    tabItems: [],
    style: {}
};

const css = `
    .tabContainer {
        margin: 0px;
        padding: 0px;
    }
    
    .ulTab {
        height:50px;
        background-color:#fcd000;
        padding: 0;
        display:table;
        width:100%;
        box-sizing:border-box;
        -moz-box-sizing:border-box;
        -webkit-box-sizing:border-box;
    }

    .ulTab li {
        display:table-cell;
        vertical-align: middle;
    }
    
    .ulTab li.active{
      background-color:#ecc511;
    }

    .ulTab li a{
      font-size: 10px;
      letter-spacing: 1.3px;
      text-align: center;
      text-decoration: none;
      text-transform: uppercase;
      color: #00105a;
    }
    
    .ulTab div {
        width:100%;
    }
`;

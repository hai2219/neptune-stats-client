/**
 *
 */
'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';

export default class ListTextComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        let {data} = this.props;
        data = data ? data : [];
        return (
            <div className="textNormal" style={this.props.style}>
                {
                    data.map((item, index)=> {
                        if (index == data.length - 1) {
                            return (<span key={index}>{item}</span>);
                        } else {
                            return (
                                <span key={index}>{item + ', '}</span>
                            );
                        }
                    })
                }
                <style>{css}</style>
            </div>
        );

    }
}

ListTextComponent.propTypes = {
    data: PropTypes.array,
    style: PropTypes.object
};

const css = `
    .textNormal{
        font-size:12px;
        margin-left:2px;
        
    }
`;

import React, { Component } from 'react';

export default class Chip extends Component {
    render() {
        return (
            <div 
                style={{ 
                    backgroundColor: "yellow", 
                    margin: "10px", 
                    padding: "10px 30px", 
                    borderRadius: "10px",
                    display: "inline-block",
                    }}>
                <span>
                    {this.props.text}
                </span>
                <span 
                    style={{
                    transform: "rotate(-45deg)",
                    display: "inline-block",
                    fontSize: "24px",
                    marginLeft: "20px",
                    cursor: "pointer",
                }}
                    onClick={(event) => this.props.onDeleteItem()}>
                    +
                </span>
            </div>
        );
    }
}
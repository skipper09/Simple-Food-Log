import React, { Component} from 'react';
import './Log.css';
import PropTypes from 'prop-types';

export default class Log extends Component {
    constructor(props) {
        super(props);
        this.logContent = props.logContent;
        this.logId = props.logId;
        this.handleRemoveLog = this.handleRemoveLog.bind(this);
    }

    handleRemoveLog(id) {
        this.props.removeLog(id);
    }

    render(){
        return(
            <div className="log fade-in">
                <span className="closebtn" 
                onClick={ () => this.handleRemoveLog(this.logId)}>
                &times;
                </span>
                <p className="logContent">{ this.logContent }</p>
            </div>
            )
    }
}

Log.propTypes = {
    logContent: PropTypes.string
}


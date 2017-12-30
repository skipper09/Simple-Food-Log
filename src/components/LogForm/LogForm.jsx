import React, { Component } from 'react';
import './LogForm.css';

export default class LogForm extends Component {
    constructor(props) {
        super(props);
        this.writeLog = this.writeLog.bind(this);
        this.state= {
            newLogContent: '',
        };
    }

    //when the user starts a log,  set the newLogContent
    //ti the value of what's in the input box
    handleUserInput = (e) => {
        this.setState({
            newLogContent: e.target.value //the value of the text input
        })
    }

    writeLog(){
        this.props.addLog(this.state.newLogContent)

        this.setState({
            newLogContent: ''
        })
    }

    render(){
        return(
            <div className="formWrapper">
            <input className="logInput"
            placeholder="Log a new day..." 
            value={this.state.newLogContent}
            onChange={this.handleUserInput} />
            <button className="logButton"
            onClick={this.writeLog}>Add log</button>


            </div>
            )
    }
}
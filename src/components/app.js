import React, { Component } from 'react';
import Log from './Log/Log';
import LogForm from "./LogForm/LogForm";
import { DB_CONFIG } from '../Config/config';
import firebase from 'firebase/app'
import 'firebase/database';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.addLog = this.addLog.bind(this)

        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('logs');

        //setting up the React state of our component
        this.state = {
            logs: []
        }
    }

    componentWillMount() {
        const previousLogs = this.state.logs;

        //Data Snapshot
        this.database.on('child_added', snap => {
            previousLogs.push({
                id: snap.key,
                logContent: snap.val().logContent,
            })

            this.setState({
                logs: previousLogs
            })
        })

        this.database.on('child_removed', snap => {
            previousLogs.forEach(function(item,i){
                if (item.id === snap.key) {
                    previousLogs.splice(i, 1)
                }
            })

            this.setState({
                logs: previousLogs
            })
        })
    }

    addLog(logs) {
        this.database.push().set({ logContent: logs })
    }

    removeLog = (logId) => {
        this.database.child(logId).remove();

    }

    render() {
        return ( <
            div className = "logsWrapper" >
            <
            div className = "logsHeader" >
            <
            div className = "heading" >
            React & Firebase Food Log <
            /div> <
            /div> <
            div className = "logBody" > {
                this.state.logs.map((log) => {
                    return ( 
                        <Log logContent = { log.logContent } 
                        logId = { log.id } 
                        key = { log.id } 
                        removeLog = {this.removeLog}
                        />
                    )
                })
            } 
            </div> <
            div className = "logsFooter" >
            <
            LogForm addLog = { this.addLog }
            /> <
            /div> <
            /div>
        )
    }
};
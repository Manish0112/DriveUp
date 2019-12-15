import React, { Component } from 'react'; 
import {Result, Button} from 'antd';
import { history } from '../../Helper/history';

class SuccessComponent extends Component{

    goHome = () => { history.push('/home'); };
    viewAppoint = () => { history.push('/home/appointments'); };

    render(){
        let id=Date.now();
        let str="Order number: "+id+" Cloud server configuration takes 1-5 minutes, please wait.";
        

        return (
            <Result
                status="success"
                title="Successfully Purchased Driving School Sessions!"
                subTitle={str}
                extra={[
                <Button type="primary" onClick={this.goHome}>
                    Go Home
                </Button>,
                <Button onClick={this.viewAppoint}>View Appointment</Button>
            ]}
            />
        )
    }
}
export default SuccessComponent;
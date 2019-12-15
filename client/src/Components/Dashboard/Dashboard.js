import React, { Component } from 'react';
import {Alert} from 'antd';

class DashboardComponent extends Component{

    render(){
        return (
            <div>
                <Alert message="Please complete the profile before enrollment." type="info" showIcon />
            </div>
        )
    }
}

export default DashboardComponent;
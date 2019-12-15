import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { Router, Route } from 'react-router-dom';
import { Table, Divider, Modal,Icon } from 'antd';
import { message } from "antd/lib/index";
import { history } from '../../Helper/history';
import { RESTService } from '../Api/api.js'

class PopoverComponent extends Component{

    state = {
        visible: false,
        studentdata:""
    };
    
    hide = () => {
        this.setState({
            visible: false,
        });
    };
    async componentDidMount() {


            let data = {};
            data.username = this.props.data.replace('Booked_','');
            console.log(data.username);     
            let userinfo =await RESTService.getUserdata(data);
            console.log(userinfo.data.result);
            
            const bookingdata = (
                <div>
                  <p><b>{"Booked By : "}</b>{userinfo.data.result.UserFullName}</p>
                  <p><b>{"Address : "}</b>{userinfo.data.result.Address + ","+userinfo.data.result.City}</p>
                  <p><b>{"Phone : "}</b>{userinfo.data.result.PhoneNumber}</p>
                </div>
              );            

              this.setState({
              studentdata:bookingdata,
            });
            

    }
    handleVisibleChange = visible => {
        this.setState({ visible });
      };
   
    render(){

        return (
            <Popover content={<a onClick={this.hide}>Close</a>}
                content={this.state.studentdata} 
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange} >
                { <Icon type="car" theme="filled" style={{color: '#d9be25' }} />}
                
            </Popover>
        )
    }
}

export default PopoverComponent;
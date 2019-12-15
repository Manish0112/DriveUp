import React, { Component } from 'react';
import { RESTService } from '../Api/api.js';
import { Descriptions, Alert ,Result , Button, Table} from 'antd';
import { history } from '../../Helper/history';
import { message } from "antd/lib/index";
import RatingComponent from './ratingPopover';


class AppointmentComponent extends Component {

    state = {
        plan: { },
        schedule: [],
        adminData: []
    };

    async componentDidMount() {


        let response = await RESTService.getAppointments();
        console.log('resr');
        console.log(this.props.isAdmin);
        if(this.props.isAdmin === true){
            console.log('in true');
            console.log(response);
            let adminData = [];
            let traverse = response.data.result;

            for(var keys in traverse){

                let temp = traverse[keys];
                console.log(temp);
                if(temp.plansummary !== undefined){
                    adminData.push({
                        Name : temp.Name,
                        plan : (temp.plansummary === 'a' ? 'Basic Plan' : (temp.plansummary === 'b' ? 'Premium plan' : 'Gold plan')),
                        schedule : temp.schedule
                    });
                }
            }

            console.log(adminData);

            this.setState({
                adminData:adminData
            });
        }

        if(response.data.result === null){
            message.error('Complete the profile first and enroll!');
        }else{

        if(response.data.result.plansummary !== null && response.data.result.plansummary !== undefined){

            // console.log('In loop');
            // console.log(response.data.result.plansummary);
            let plan = {};

            if(response.data.result.plansummary.plan === 'a'){
                plan.des='Basic plan';
                plan.title='4 Session plan';
                plan.charge='$50/Session';
                plan.amount='$200.00';
                plan.official='$180.00';

            }else if(response.data.result.plansummary.plan === 'b'){
                plan.des='Premium plan';
                plan.title='6 Session plan';
                plan.charge='$40/Session';
                plan.amount='$240.00';
                plan.official='$220.00';

            }else if(response.data.result.plansummary.plan === 'c'){
                plan.des='Gold plan';
                plan.title='10 Session plan';
                plan.charge='$30/Session';
                plan.amount='$300.00';
                plan.official='$280.00';
            }

            this.setState({
                plan:plan,
                schedule:response.data.result.schedule
            });
        }
    }
    };

    handle = () => { history.push('/home'); };

    render(){

        const columns = [
            {
                title: 'Student Name',
                dataIndex: 'Name'         
            },
            {
                title: 'Plan',
                dataIndex: 'plan'         
            },
            {
                title: 'Appointment Schedule',
                dataIndex: 'schedule',
                render: (schedule) => 
                <Descriptions layout="vertical" bordered
                column={{ xs: 8, sm: 16, md: 24}}>
                {schedule.map((item,index) => {
                    return (
                        <Descriptions.Item label={"Slot "+(++index)}>
                            Instructor Name: {item.iusername}
                            <br />
                            Date: {item.sdate}
                            <br />
                            <b>Slot: </b>{item.slot.substring(7)}
                            <br />
                        </Descriptions.Item>
                    )
                })}
                </Descriptions>
            }
        ];


        let plan = this.state.plan;
        let isAdmin =  this.props.isAdmin;
        let id=Date.now();
        let str="Your appointment is "+id+" confirmed. The summary of schedule is given below.";
        return(
        
        <div>{!isAdmin &&  <div>
            { this.state.schedule.length !==0 && <Alert
                message="Appointment Confirmed"
                description={str}
                type="success"
                showIcon
            />}
            { this.state.schedule.length ===0 && <Result
                    status="warning"
                    title="Currently no appointments are scheduled for you. Please enroll into the plan for scheduling an appointment."
                    extra={
                    <Button type="primary" key="console" onClick={this.handle}>
                        Go Back
                    </Button>
                    }
                />}
            <br/>
            { this.state.schedule.length !==0 && <Descriptions
                    title="Plan Summary"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                <Descriptions.Item label="Plan">{plan.des}</Descriptions.Item>
                <Descriptions.Item label="Description">{plan.title}</Descriptions.Item>
                <Descriptions.Item label="Charges">{plan.charge}</Descriptions.Item>
                <Descriptions.Item label="Amount">{plan.amount}</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Amount">{plan.official}</Descriptions.Item>
                </Descriptions>}
            <br />
            { this.state.schedule.length !== 0 && <Descriptions title="Appointment Schedule" layout="vertical" bordered
                column={{ xs: 8, sm: 16, md: 5}}>
                {this.state.schedule.map((item,index) => {
                    return (
                        <Descriptions.Item label={"Session "+(++index)}>
                            <b>Instructor Name:</b> {item.iusername}
                            <br />
                            <b>Date:</b> {item.sdate}
                            <br />
                            <b>Slot: </b>{item.slot.substring(7)}
                            <br />
                            <br />
                            {Date.parse(item.sdate) < Date.now() && <RatingComponent instructor={item.iusername}/>}
                        </Descriptions.Item>
                    )
                })}
                </Descriptions>}
            
        </div>
        }

        {isAdmin && <div>
            <Table columns={columns} dataSource={this.state.adminData}/>
        </div>}
        </div>
    )}
}

export default AppointmentComponent;
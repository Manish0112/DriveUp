import React, { Component } from 'react';

import moment from 'moment';
import { message } from "antd/lib/index";
import { RESTService } from '../Api/api.js'

import Plans from './Plans';
import InstructorSelection from './InstructorSelection';
import SummaryComponent from './Summery';
import { history } from '../../Helper/history';
import { Button } from 'react-bootstrap';
import StripeCheckoutButton from 'react-stripe-checkout';

class EnrollmentComponent extends Component{

    state = {
        firstPage : true,
        secondPage : false,
        finalPage : false,
        tableData: [],
        plan : 0,
        selectedSchedules : [],
        planSummary : {},
        individualData: {}
    };

    getInstructors = async (data) => {
        let response= await RESTService.getInstructorsForDates(data);
        // console.log('Inside get isntructor');
        // console.log(response);
        var status = response.statusText;
        console.log(response);
        
        if(status === 'Instructors are Available' && response.data.result.data.length >= data.planNo){
            message.success('Select the available Instructors!');
            this.setState({
                firstPage : false,
                secondPage : true,
                tableData: response.data.result.data,
                individualData: response.data.result.individualData
            })
        }
        else{
            message.error('No available Instructors for selected slot! Select different dates or time slots!');
            this.setState({
                firstPage : true,
                secondPage: false
            })
        }
    };

    callBackAfterSelection = (data) => {
        this.setState({selectedSchedules: data , secondPage: false, finalPage: true})
    };


    myCallback = (planSummary) => {

        if(planSummary.plan === 'c'){
            this.setState({plan: 10,name: "Basic plan - 10 Sessions",
            price: 280.00})
        }
        else if(planSummary.plan === 'b'){
            this.setState({plan: 6,name: "Basic plan - 6 Sessions",
            price: 220.00})
        }
        else if(planSummary.plan === 'a'){
            this.setState({plan: 4,name: "Basic plan - 4 Sessions",
            price: 180.00})
        }

        this.setState({planSummary: planSummary});

        var slot0810='N';
        var slot1012='N';
        var slot1214='N';
        var slot1416='N';
        var slot1618='N';
        var slot1820='N';
        var slot2022='N';

        if(planSummary.slots.includes('slot0810')){
            slot0810='Y';
        }
        if(planSummary.slots.includes('slot1012')){
            slot1012='Y';
        }
        if(planSummary.slots.includes('slot1214')){
            slot1214='Y';
        }
        if(planSummary.slots.includes('slot1416')){
            slot1416='Y';
        }
        if(planSummary.slots.includes('slot1618')){
            slot1618='Y';
        }
        if(planSummary.slots.includes('slot1820')){
            slot1820='Y';
        }
        if(planSummary.slots.includes('slot2022')){
            slot2022='Y';
        }

        let fromdate = moment(planSummary.availDates[0]).format("DD-MMM-YYYY");
        let todate = moment(planSummary.availDates[1]).format("DD-MMM-YYYY");
    
        let data = {};

        data.fromdate=fromdate;
        data.todate=todate;
        data.slots=planSummary.slots;
        data.slot0810=slot0810;
        data.slot1012=slot1012;
        data.slot1214=slot1214;
        data.slot1416=slot1416;
        data.slot1618=slot1618;
        data.slot1820=slot1820;
        data.slot2022=slot2022;

        if(planSummary.plan === 'a'){
            data.planNo = 4;
        }
        else if(planSummary.plan === 'b'){
            data.planNo = 6;
        }
        else if(planSummary.plan === 'c'){
            data.planNo = 10
        }
        
        this.getInstructors(data);  
        
    };
         
   
    confirmation = async (token) => {
    
        let data = {};
        data.token=token;
        data.product={
            name: this.state.name,
            price: this.state.price
          };

        try {
           await RESTService.payment(data);
    
            message.success('Payment Complete');
            let summary = {};
            
            summary.selectedSchedules=this.state.selectedSchedules;
            summary.planSummary=this.state.planSummary;
            summary.tableData=this.state.tableData;
    
            await RESTService.saveSummary(summary);
            message.success('Enrollment confirmed!');
            history.push('/home/success');
    
        }
        catch (err) {
            message.error('Something Went Wrong!');
            message.error(err.message);
        }
    console.log(token);
    };
    

    render(){
  
        return(
            <div>
                {this.state.firstPage && <Plans callbackFromParent={this.myCallback}/>}
                {this.state.secondPage && <InstructorSelection callbackToSelect={this.callBackAfterSelection} instructorListFromParent={this.state.tableData} plan={this.state.plan} planSummary={this.state.planSummary} individualData={this.state.individualData}/>}
                {this.state.finalPage && <SummaryComponent selectedSchedules={this.state.selectedSchedules} planSummary={this.state.planSummary}/>}
                <br/>
                {this.state.finalPage && <StripeCheckoutButton 
                            stripeKey="pk_test_f5U22ypjQyKYJtUFUjwmBG2a00U3B5VM2B"
                            token={this.confirmation}
                            billingAddress
                            shippingAddress
                            amount={this.state.price * 100}
                            name={"Driving Lessons"}
                            />}
            </div>
        )
    }

}

export default EnrollmentComponent;
import React, { Component } from 'react';
import { message } from "antd/lib/index";
import { Checkbox,Button } from 'antd';
import {Form, Col} from 'react-bootstrap'; 
import { DatePicker } from 'antd';
import moment from 'moment';
import { history } from '../../Helper/history';
import { RESTService } from "../Api/api.js";
const { RangePicker } = DatePicker;

var slot0810="";
var slot1012="";
var slot1214="";
var slot1416="";
var slot1618="";
var slot1820="";
var slot2022="";
var fromdate = moment();
var todate = moment();


      const options = [
        { label: '8am to 10am', value: 'slot0810' },
        { label: '10am to 12pm', value: 'slot1012' },
        { label: '12pm to 2pm', value: 'slot1214' },
        { label: '2pm to 4pm', value: 'slot1416' },
        { label: '4pm to 6pm', value: 'slot1618' },
        { label: '6pm to 8pm', value: 'slot1820' },
        { label: '8pm to 10pm', value: 'slot2022' }
      ];
      function onChange(dates, dateStrings) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        fromdate = moment(dates[0]);
        todate = moment(dates[1]);
        console.log('From: ', fromdate.format("DD-MON-YYYY"), ', to: ',todate.format("DD-MON-YYYY"));

      }
      function onChangecheck(check) {
        console.log('From: ',  check[0], ', to: ', check[1]);
        slot0810="N";
        slot1012="N";
        slot1214="N";
        slot1214="N";
        slot1416="N";
        slot1618="N";
        slot1820="N";
        slot2022="N";

       for(var i=0;i<9;i++){
        if(check[i]==='slot0810'){
            slot0810="Y";
        }
        if(check[i]==='slot1012'){
            slot1012="Y";
        }
        
        if(check[i]==='slot1214'){
            slot1214="Y";
        }
        
        if(check[i]==='slot1416'){
            slot1416="Y";
        }
        if(check[i]==='slot1618'){
            slot1618="Y";
        }
        if(check[i]==='slot1820'){
            slot1820="Y";
        }
        if(check[i]==='slot2022'){
            slot2022="Y";
        }
    }
        //console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      }    
class IDetails extends Component{
    async componentDidMount() {


    }

    handleSubmit = async(e) => {

        e.preventDefault();
        //console.log('Received values of slot1012: ', slot0810);
        //console.log('Received values of date range: ', fromdate,' to',todate);
        let data = {};
        data.slot0810=slot0810;
        data.slot1012=slot1012;
        data.slot1214=slot1214;
        data.slot1416=slot1416;
        data.slot1618=slot1618;
        data.slot1820=slot1820;
        data.slot2022=slot2022;
        data.fromdate =fromdate.format("DD-MMM-YYYY");
        data.todate = todate.format("DD-MMM-YYYY");
        //console.log(data);
        //return;
        await RESTService.createinstructorSchedule(data);
       message.success('Schedule created Successfully!');
       history.push('/home/iSchedule');


        // this.props.form.validateFields(async (err, values) => {
        
        //     console.log('Received values of form: ', values);


                
        // });
    }
    async onChangefn(checkedValues) {
        console.log('checked = ', checkedValues);
      }
      

    render() {
        return (
        
            <div className="container">
            <br/>
                <Form onSubmit={this.handleSubmit} className="idetails">                
                    <Form.Group as={Form.Row}>
                    <Form.Label>Schedule Date Range</Form.Label>    
                    <Col sm={12}>
                    <RangePicker
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={onChange}
                    />                        
                    </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Form.Row}>
                    <Form.Label>Time Slots</Form.Label>
                    <Col sm={12}>
                        <Checkbox.Group options={options} onChange={onChangecheck}/>    
                        </Col>
                    </Form.Group>
                    <br/>
                <Button type="primary" htmlType="submit" className="login-form-button">
                                        Create Schedule
                </Button>
                </Form>
            </div>
        )
    }
}

export default IDetails;
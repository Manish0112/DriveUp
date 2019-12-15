import React, { Component } from 'react'; 
import { connect } from "react-redux";
import {
    Form, Button, Input, Select, DatePicker, Radio, message
} from 'antd';
import { history } from '../../Helper/history';
import { RESTService } from "../Api/api.js";
import moment from 'moment';

class EnrollComponent extends Component{

    state = {
        loading: false,
        addressPop:'',
        minorPop:'',
        prefixPop: '',
        numberPop: '',
        country:'',
        gender:'',
        city:'',
        ctype:'',
        dualcontrol:'',
        ilicence:''

    };
    
    async componentDidMount() {

        try {
            let response=await RESTService.checkProfile();
            let userdata=await RESTService.getloggedInUserData();

            let usertype=userdata.data.result[0].usertype;
            if (usertype === "instructor") {

                this.setState({
                    isInstructor: true
                })
            }
            else {
                this.setState({
                    isInstructor: false,
                })
            }


            if(response.data.student === undefined){
                message.info('Fill the below details');
            }
            else{

                //console.log(response.data);
                this.setState({
                    addressPop: response.data.student.Address,
                    minorPop: response.data.student.Minor,
                    country:response.data.student.Country,
                    gender:response.data.student.Gender,
                    city:response.data.student.City,
                    prefixPop: response.data.student.PhoneNumber.substring(0,3).replace("0", ''),
                    numberPop: response.data.student.PhoneNumber.slice(-10),
                    ctype:response.data.student.ctype,
                    dualcontrol:response.data.student.dualcontrol,
                    ilicence:response.data.student.ilicence,
                    DOB:moment(response.data.student.DOB),
                })

                message.success('Profile already completed');
            }
            
        }
        catch (err) {
            console.log(err);
        }

         
    }

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields(async(err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
           
            let data = {};


            data.address = values.address;
            data.minor = values.age;
            data.gender = values.gender;
            data.phone = values.prefix+''+values.phone;
            data.country= values.country;
            data.city=values.city;
            data.dob=values.DOB._d;
            data.ctype=values.ctype;
            data.dualcontrol=values.dualcontrol;
            data.ilicence=values.ilicence;
            try {
                await RESTService.enroll(data);

                message.success('Saved Successfully');

                history.push('/home');
            }
            catch (err) {
                this.setState({loading: false});
            }
          }
          else {
            this.setState({loading: false});
            message.error('Incomplete information');
        }
        });
      };

    render() {
    
        const {getFieldDecorator} = this.props.form;
        const { Option } = Select;
        const isInstructor = this.state.isInstructor;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.state.prefixPop,
          })(
            <Select style={{ width: 70 }}>
              <Option value="+01">+1</Option>
              <Option value="+91">+91</Option>
            </Select>,
          );

        return (
               
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <h4 className="alignCenter">Profile Completion</h4>

            <Form.Item label="Are you at least 18 years old?">
                {getFieldDecorator('age', {
                    initialValue: this.state.minorPop,
                    rules: [{required: true,message: 'Please input your age!'}],
                })(
                    <Radio.Group >
                    <Radio value="No">Yes</Radio>
                    <Radio value="Yes">No</Radio>
                    </Radio.Group>,
                )}
            </Form.Item>
         
            <Form.Item label="Residential/Permanent Address" >
                {getFieldDecorator('address', {
                    initialValue: this.state.addressPop,
                    rules: [{
                        required: true,
                        message: 'Please input your address!',
                    }],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="City" >
                {getFieldDecorator('city', {
                    initialValue: this.state.city,
                    rules: [{
                        required: true,
                        message: 'Please input your city!',
                    }],
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Select country" hasFeedback>
                {getFieldDecorator('country', {
                    initialValue: this.state.country,
                    rules: [{ required: true, message: 'Please select your country!' }],
                })(
                    <Select placeholder="Please select a country">
                    <Option value="china">China</Option>
                    <Option value="usa">U.S.A</Option>
                    </Select>,
                )}
            </Form.Item>

            <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                    initialValue: this.state.numberPop,
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </Form.Item>

            <Form.Item label="Gender">
                {getFieldDecorator('gender', {
                    initialValue: this.state.gender,
                    rules: [{ required: true, message: 'Please select your gender!' }],
                })(
                    <Select
                    placeholder="Select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="Date of Birth" style={{ marginBottom: 0 }}>
            <Form.Item>
            {getFieldDecorator('DOB', {
                initialValue: this.state.DOB,
                rules: [{ required: true, message: 'Please select your Date of Birth!' }],
            })(
                <DatePicker/>,
            )}
                
            </Form.Item>
            </Form.Item>
            {isInstructor && 
            <Form.Item label="Car Type" hasFeedback>
                {getFieldDecorator('ctype', {
                    initialValue: this.state.ctype,
                    rules: [{ required: true, message: 'Please select Car Type!' }],
                })(
                    <Select placeholder="Please select a country">
                    <Option value="hatchback">Hatchback</Option>
                    <Option value="sedan">Sedan</Option>
                    <Option value="suv">SUV</Option>
                    </Select>,
                )}
            </Form.Item>
            }
            {isInstructor && 
            <Form.Item label="Dual Controls installed?">
                {getFieldDecorator('dualcontrol', {
                    initialValue: this.state.dualcontrol,
                    rules: [{required: true,message: 'Please input value for Dual Controls installed'}],
                })(
                    <Radio.Group >
                    <Radio value="No">Yes</Radio>
                    <Radio value="Yes">No</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            }
            {isInstructor && 
            <Form.Item label="Instructor Licence Available?">
                {getFieldDecorator('ilicence', {
                    initialValue: this.state.ilicence,
                    rules: [{required: true,message: 'Please input value for Instructor Licence Status'}],
                })(
                    <Radio.Group >
                    <Radio value="No">Yes</Radio>
                    <Radio value="Yes">No</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            }
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
                Save Details
            </Button>
            </Form.Item>
            </Form>

    )}
};

function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(Form.create()(EnrollComponent));
import React, { Component } from 'react';
import {
    Form, Button, Input, DatePicker, Radio, Rate, Checkbox,Alert
} from 'antd';

import { connect } from "react-redux";
const { RangePicker } = DatePicker;

class PlanComponent extends Component{

    state = {
        loading: false,
        visible: true
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.callbackFromParent(values);
          }
        });
    };
  
    handleClose = () => {
      this.setState({ visible: false });
    };

    render() {

        const options = [
          { label: '8am to 10am', value: 'slot0810' },
          { label: '10am to 12pm', value: 'slot1012' },
          { label: '12pm to 2pm', value: 'slot1214' },
          { label: '2pm to 4pm', value: 'slot1416' },
          { label: '4pm to 6pm', value: 'slot1618' },
          { label: '6pm to 8pm', value: 'slot1820' },
          { label: '8pm to 10pm', value: 'slot2022' }
        ];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const rangeConfig = {
          rules: [{ type: 'array', required: true, message: 'Please select time!' }]}

        return (
          <div>
              {this.state.visible ? (
                  <Alert
                    message="Complete the following form."
                    type="info"
                    closable
                    afterClose={this.handleClose}
                  />
                ) : null}
          
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <br /><br />
              <Form.Item label="Select the suitable plan">
                {getFieldDecorator('plan' ,
                {rules: [{required: true,message: 'Please select a plan!'}]})(
                  <Radio.Group>
                    <Radio.Button value="a" style={{ height: '20vh' ,width: '25vh' ,padding: '30px' }}>
                      <h7>4 Session plan</h7>
                      <p>$50/Session</p>
                    </Radio.Button>
                    <Radio.Button value="b" style={{ height: '20vh' ,width: '25vh' ,padding: '30px'}}>
                      <h7>6 Session plan</h7>
                      <p>$40/Session</p>
                    </Radio.Button>
                    <Radio.Button value="c" style={{ height: '20vh' ,width: '25vh' ,padding: '30px'}}>
                      <h7>10 Session plan</h7>
                      <p>$30/Session</p>
                    </Radio.Button>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="Your available dates">{getFieldDecorator('availDates', rangeConfig)(<RangePicker />)}</Form.Item>
              <Form.Item label="Select your preferred slots">{getFieldDecorator('slots', rangeConfig)(<Checkbox.Group options={options} />)}</Form.Item>
              <Form.Item label="Enter city you prefer" >
                {getFieldDecorator('city', {
                    rules: [{
                        required: true,
                        message: 'Please input city!',
                    }],
                })(<Input />)}
            </Form.Item >
            <Form.Item label="How much confident you are on your driving skills">{getFieldDecorator('rating')(<Rate />)}</Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
                Next
            </Button>
            </Form.Item>

            </Form>
        </div>
  )}
}

function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(Form.create()(PlanComponent));
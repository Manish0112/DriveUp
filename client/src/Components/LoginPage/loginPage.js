import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Row, Col, Spin, message
} from 'antd';

import { history } from '../../Helper/history';
import { RESTService } from "../Api/api.js";
import { simpleAction } from '../Actions/simpleAction';
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
const config = require('../../config.json');

class loginPage extends Component {
    state = {
        loading: false,
    };


    async componentDidMount() {


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        this.props.form.validateFields(async (err, values) => {
            if (!err) {

                console.log('Received values of form: ', values);

                let data = {};
                data.username = values.email;
                data.password = values.password;
                let userDetails;

                try {

                    userDetails = await RESTService.login(data);
                    console.log('Received userDetails: ', userDetails);
                    console.log('Received usertype: ', userDetails.data.result[0].usertype);
                    message.success('Logged in Successfully');
                    let usertypeL=userDetails.data.result[0].usertype;
                    if( usertypeL === 'student'){
                    history.push('/home');
                }else if( usertypeL=== 'instructor'){
                    history.push('/home/instructor');
                }else if( usertypeL=== 'vendor'){
                    history.push('/home/vedor');
                }else{
                    history.push('/home');
                }

                }
                catch (err) {
                    this.setState({loading: false});
                    message.error('Invalid Credentials!');
                }


            }
            else {
                this.setState({loading: false});
                message.error('Incomplete information');
            }
        });
    }
    
    responseFacebook = async (response) => {
        console.log(response);
        let data = {
            email: response.email,
            username: response.email,
            password: response.accessToken,
            firstname: response.name.split(" ")[0],
            lastname: response.name.split(" ")[1],
            phone: '',
            accessToken: response.accessToken
        }
        
        this.setState({loading: true});
        try {
            await RESTService.oAuthlogin(data);
            message.success('Logged in Successfully');
            history.push('/home');
        } catch (err) {
            this.setState({loading: false});            
            message.error('Error with Signing in with Facebook');
        }
    }

    responseGoogle = async (response) => {
        console.log(response);
        let data = {
            email: response.profileObj.email,
            username: response.profileObj.email,
            password: response.accessToken,
            firstname: response.profileObj.name.split(" ")[0],
            lastname: response.profileObj.name.split(" ")[1],
            phone: '',
            accessToken: response.accessToken
        }
        
        this.setState({loading: true});
        try {
            await RESTService.oAuthlogin(data);
            message.success('Logged in Successfully');
            history.push('/home');
        } catch (err) {
            this.setState({loading: false});            
            message.error('Error with Signing in with Facebook');
        }
    }

    responseGoogleFailure = (response) => {
        console.log('Handle failure');
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        return (
            <div className="Login">
                <Row type="flex" justify="space-around" align="middle" className="fullHeight">
                    <Col span={7} className="boxShadow">
                        <Spin spinning={this.state.loading} delay={500}>
                            <h2 className="alignCenter">Login</h2>
                            <Form onSubmit={this.handleSubmit} className="login-form">

                                <Form.Item label="e-mail/Username" className="marginBottom0">
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: 'Please enter your email!'}],
                                    })(
                                        <Input prefix={<Icon type="global" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="email"/>
                                    )}
                                </Form.Item>

                                <Form.Item label="password" className="marginBottom0">
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password" placeholder="Password"/>
                                    )}
                                </Form.Item>

                                <Form.Item className="alignCenter" style={{marginBottom: 0, marginTop: 5}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Login
                                    </Button>
                                </Form.Item>

                                <Form.Item className="alignCenter" style={{lineHeight: 0}}>
                                    or <a href="/signUp">Register now!</a>
                                </Form.Item>

                                {/* Login with Facebook */}
                                <Form.Item className="alignCenter mb-0" style={{marginTop: 5}}>
                                    <FacebookLogin
                                        appId = {config.FACEBOOK_APP_ID}
                                        fields="name,email,picture"
                                        callback={this.responseFacebook}
                                        icon="fa-facebook"
                                        className = 'w-75'
                                        size = "medium"
                                    >
                                    </FacebookLogin>
                                </Form.Item>

                                {/* Login with Google */}
                                <Form.Item className="mt-2 alignCenter">
                                    <GoogleLogin
                                        clientId={config.GOOGLE_APP_CLIENT_ID}
                                        buttonText="LOGIN WITH GOOGLE"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogleFailure}
                                        className = 'w-75'
                                        size = "medium"
                                    />
                                </Form.Item>                               
                            </Form>
                        </Spin>
                    </Col>
                </Row>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(Form.create()(loginPage));
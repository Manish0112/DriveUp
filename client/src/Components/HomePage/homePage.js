import React, { Component } from 'react';

import { history } from '../../Helper/history';
import { Router, Route } from 'react-router-dom';
import {
    Layout, Menu, Button, Icon
} from 'antd';
import { Form, message } from "antd/lib/index";

import { connect } from "react-redux";
import StudentDashboard from "../Dashboard/StudentDashboard"
import InstructorDashboard from "../Dashboard/InstructorDashboard"
import Dashboard from "../Dashboard/Dashboard"

import UploadComponent from "../Upload/UploadComponent";
import UserTable from "../UserTable/UserTable";
import Enroll from "../Enroll/Enroll";
import Enrollment from "../Enroll/Enrollment";
import IDetails from "../Instructor/iDetails";
import ISchedule from "../Instructor/iSchedule";
import TableComponent from "../Table/TableComponent";

import { RESTService } from "../Api/api.js";

import { Typography } from 'antd';
import AppointmentComponent from '../Appointment/Appointment';
import SuccessComponent from '../Enroll/Success';
import ResourcesComponent from '../Resources/Resources';

const {Text} = Typography;

const SubMenu = Menu.SubMenu;


const {Content, Sider, Footer, Header} = Layout;

class homePage extends Component {
    state = {
        itemKey: '1',
        collapsed: false,
        loading: true,
        isAdmin: false,
        showName: ''
    };


    async componentDidMount() {
        // console.log(response.data.loggedInUser.username);
        let response = await RESTService.checkLogin();
        
        if (response.data.loggedInUser.username === "admin") {

            this.setState({
                isAdmin: true,
                showName: 'Admin',
            })
        }
        else {
            this.setState({
                isAdmin: false,
                showName: response.data.loggedInUser.firstName + ' ' + response.data.loggedInUser.lastName,
                // showName: response.data.loggedInUser.username
            })
        }

        if(response.data.loggedInUser.usertype === "student"){
            this.setState({
                isStudent: true,
                isInstructor : false
            })
        }
        else if(response.data.loggedInUser.usertype === "instructor"){
            this.setState({
                isStudent: false,
                isInstructor : true
            })
        }else{
            this.setState({
                isStudent: false,
                isInstructor : false
            })
        }

    }

    onCollapse = (collapsed) => {

        this.setState({collapsed});
    };


    handleClick = (e) => {

        //redirecting to render correct component

        this.setState({itemKey: e.key});
        if (e.key === '1') {
            history.push('/home');
        }
        else if (e.key === '2') {
            history.push('/home/upload');
        }
        else if (e.key === '3') {
            history.push('/home/allUsers');
        }
        else if (e.key === '4') {
            history.push('/home/appointments');
        }else if (e.key === '5') {
            history.push('/home/iSchedule');
        }
    };

    logoutButton = async () => {

        try {
            await RESTService.logout();
            message.success('Logged out Successfully');
        }
        catch (err) {
            message.error("User not logged in");
        }


        history.push('/Login');

    };

    //Manish
    completeProfile = async () => {
        history.push('/home/enroll');
    };


    render() {

        const {simpleReducer} = this.props;

        const isAdmin = this.state.isAdmin;
        const isStudent = this.state.isStudent;
        const isInstructor = this.state.isInstructor;

        let marginLeft = 200;
        if (this.state.collapsed) {
            marginLeft = 80;
        }

        let selectedKey = '1';

        //logic to render correct selected menu item

        switch (window.location.pathname) {
            
            case '/home':
                selectedKey = '1';
                break;

            case '/home/upload':
                selectedKey = '2';
                break;

            case '/home/allUsers':
                selectedKey = '3';
                break;

            case '/home/appointments':
                selectedKey = '4';
                break;
            case '/home/appointments':
                    selectedKey = '5';
                    break;    

            default:
                // history.push('/home/allFiles');
                break;
        }


        return (
            <div className="HomePage">
                <Layout style={{minHeight: '100vh'}}>
                    <Header style={{position: 'fixed', width: '100%', zIndex: 1}} theme='dark'>

                        <Icon type="dashboard" style={{fontSize: '60px', marginLeft: '17px', color: '#ff872f'}}/>
                        <Button type="primary" icon="right-circle" onClick={this.completeProfile}
                                style={{float: 'right', marginTop: '16px',marginLeft:'10px'}}>
                            Complete your profile!
                        </Button>

                        <Button type="primary" icon="poweroff" onClick={this.logoutButton}
                                style={{float: 'right', marginTop: '16px'}}>
                            Logout!
                        </Button>
                        <Text style={{float: 'right', color:'white', marginRight:'10px'}}>Welcome, {this.state.showName}</Text>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 64
                        }}
                               collapsible
                               collapsed={this.state.collapsed}
                               onCollapse={this.onCollapse}
                               theme='dark'
                        >


                            <Menu
                                onClick={this.handleClick}
                                style={{height: '100%'}}
                                mode="inline"
                                selectedKeys={[selectedKey]}
                                defaultOpenKeys={['sub1']}
                                theme='dark'
                            >

                                {<Menu.Item key="1"><span><Icon
                                    type="appstore"/><span>Dashboard</span></span></Menu.Item>
                                }
                                {isAdmin &&
                                <Menu.Item key="3"><span><Icon type="team"/><span>All Users</span></span></Menu.Item>
                                }
                                {(isInstructor || isAdmin)&&
                                <Menu.Item key="2"><span><Icon type="upload"/><span>Documents</span></span></Menu.Item>
                                }
                                {(isStudent) &&
                                <Menu.Item key="4"><span><Icon type="schedule"/><span>Appointments</span></span></Menu.Item>
                                }
                                {isAdmin &&
                                <Menu.Item key="4"><span><Icon type="schedule"/><span>All Appointments</span></span></Menu.Item>
                                }
                                {(isAdmin) &&
                                <Menu.Item key="5"><span><Icon type="schedule"/><span>Instructor Appointments</span></span></Menu.Item>
                                }
                            </Menu>
                        </Sider>
                        <Layout style={{
                           background: 'linear-gradient(to top, rgb(24, 124, 214)  0%, rgb(63, 109, 151)  10%)',
                            padding: '25px 24px 24px',
                            marginLeft: marginLeft,
                            marginTop: 64
                        }}>
                            <Content style={{
                                padding: 24,
                                minHeight: 280,
                                margin: '0 16px'
                            }}

                            >

                                <Router history={history}>

                                    <Route exact path="/home"
                                           render={(props) => <div><Dashboard/>{isStudent && <StudentDashboard/>}
                                                    {isInstructor && <InstructorDashboard/>}
                                                    {!isStudent && !isInstructor && <TableComponent/>}

                                           </div>}
                                    />
                                    <Route exact path="/home/instructor"
                                           render={(props) => <div><InstructorDashboard/></div>}
                                    />

                                    <Route exact path="/home/upload"
                                           render={(props) => <div><UploadComponent/></div>}
                                    />

                                    <Route exact path="/home/appointments"
                                           render={(props) => <div><AppointmentComponent isAdmin={isAdmin}/></div>}
                                    />

                                    <Route exact path="/home/allUsers"
                                           render={(props) => <div><UserTable/></div>}
                                    />
                                    <Route exact path="/home/enroll"
                                           render={(props) => <div><Enroll/></div>}
                                    />
                                    <Route exact path="/home/plan"
                                           render={(props) => <div><Enrollment/></div>}
                                    />
                                    <Route exact path="/home/iSchedule"
                                           render={(props) => <div><ISchedule/></div>}
                                    />
                                    <Route exact path="/home/iDetails"
                                           render={(props) => <div><IDetails/></div>}
                                    />
                                     <Route exact path="/home/success"
                                           render={(props) => <div><SuccessComponent/></div>}
                                    />
                                    <Route exact path="/home/resources"
                                           render={(props) => <div><ResourcesComponent/></div>}
                                    />
                                    
                                </Router>

                            </Content>
                            <Footer style={{
                                textAlign: 'center', background: 'none',
                                color: 'white'
                            }}>
                                DriveUp Prototype for Enterprise software platform © San Jose State University
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
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

export default connect(mapStateToProps)(homePage);
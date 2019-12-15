import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Table, Divider, Modal } from 'antd';
import { message } from "antd/lib/index";
import { history } from '../../Helper/history';
import { RESTService } from '../Api/api.js'


class UserTable extends Component {


    state = {tableData: []};


    async componentDidMount() {


        let response = await RESTService.getUserTableData();


        this.setState({tableData: response.data.result});


    }

    deleteUser = async (userName) => {

        let data = {};
        data.username = userName;
        await RESTService.deleteUser(data);
        message.success('User ' + userName + ' deleted Successfully!');
        let response = await RESTService.getUserTableData();
        this.setState({tableData: response.data.result});
    };


    render() {
// //{
//         "user_id": 14,
//             "username": "testuser6",
//             "password": "test6",
//             "firstname": "test6",
//             "lastname": "user6",
//             "email": "pankajhpatil21@gmail.com",
//             "modifieddate": "2019-10-24T09:18:50.000Z",
//             "phone": "+1(669)288-4958"
//     }

        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstname',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastname',
            },
            {
                title: 'User Name',
                dataIndex: 'username',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
            },
            {
                title: 'Action',
                dataIndex: 'username',
                render: (text) => <div><a
                    onClick={() => this.deleteUser(text)}>Delete</a></div>,
            },

        ];


        return (
            <div className="table">
                <Table columns={columns} dataSource={this.state.tableData}/>
            </div>
        );
    }
}


export default UserTable;
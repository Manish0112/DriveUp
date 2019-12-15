import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Table, Divider, Modal,Icon } from 'antd';
import { message } from "antd/lib/index";
import { history } from '../../Helper/history';
import { RESTService } from '../Api/api.js'
import { Popover, Button } from 'antd';
import PopoverComponent from './PopoverComponent';


class ISchedule extends Component {
  // state = {
  //   visible: false,
  // };

  // hide = () => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  // handleVisibleChange = visible => {
  //   this.setState({ visible });
  // };
 

    state = {tableData: []};


    async componentDidMount() {


        let response = await RESTService.getinstructorSchedule();
        //console.log(response.data.result);
        this.setState({tableData: response.data.result});


    }

    deleteISchedule = async (sdate) => {

        let data = {};
        data.sdate = sdate;
        await RESTService.deleteISdetails(data);
        message.success('Schedule for date "' + sdate + '" deleted Successfully!');
        let response = await RESTService.getinstructorSchedule();
        this.setState({tableData: response.data.result});

    };
    refresh = async (sdate) => {

      let response = await RESTService.getinstructorSchedule();
      this.setState({tableData: response.data.result});

  };
//iAppointment



    render() {

        const columns = [
            {
                title: 'Schedule Date',
                dataIndex: 'sdate',
            },
            {
                title: '(8am-10am)',
                dataIndex: 'slot0810',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>           
            },  
            {
                title: '(10am-12pm)',
                dataIndex: 'slot1012',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: '(12pm-2pm)',
                dataIndex: 'slot1214',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: '(2pm-4pm)',
                dataIndex: 'slot1416',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: '(4pm-6pm)',
                dataIndex: 'slot1618',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: '(6pm-8pm)',
                dataIndex: 'slot1820',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: '(8pm-10pm)',
                dataIndex: 'slot2022',
                render: (text) => <div>
                { (text==="Y" ? <Icon type="check" style={{color: '#3ebd04' }} />
                  :(text==="N" ?  <Icon type="dash" />:
                    <PopoverComponent data={text}/>
                    ))
                }
              </div>
            },
            {
                title: 'Action',
                dataIndex: 'sdate',
                render: (text) => <div><a 
                onClick={() => this.deleteISchedule(text)}><Icon type="delete" style={{color: '#f00d0a' }} /></a></div>,
            },

        ];


        return (
            <div className="table">
                <Button type="primary" onClick={this.refresh} ><Icon type="reload"/></Button>
                <br/>
                <Table columns={columns} dataSource={this.state.tableData}/>
            </div>
        );
    }
}


export default ISchedule;
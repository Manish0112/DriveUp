import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap'; 
import { history } from '../../Helper/history';
import {Button} from 'antd';



class InstructorDashboardComponent extends Component{
    iSchedule = () => { history.push('/home/iSchedule'); };
    iDetails = () => { history.push('/home/iDetails'); };

    render() {
     
        return (
            <div className="cards" style={{ display: 'flex', alignItems:'center', height: '20%' }}>
                <table>
                    <tr>
                        <td style={{ padding: '70px' }}>
                        <Jumbotron style={{ width: '26rem' , height: '20rem' }}>
                            <h1>My Schedule</h1>
                            <p>
                            Click here to view your engagements
                            </p>
                            <p>
                            <Button type="primary" size="large" icon="login" onClick={this.iSchedule}>Go</Button>
                            </p>
                        </Jumbotron>
                        </td>
                        <td style={{ padding: '70px' }}>
                        <Jumbotron style={{ width: '30rem' , height: '20rem' }}>
                            <h1>Update Availability</h1>
                            <p>
                            Click here to update your availability details
                            </p>
                            <p>
                            <Button type="primary" size="large" icon="login" onClick={this.iDetails}>Go</Button>
                            </p>
                        </Jumbotron>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default InstructorDashboardComponent;
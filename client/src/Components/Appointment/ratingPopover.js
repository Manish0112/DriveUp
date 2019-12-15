import React, { Component } from 'react';
import {Button, Progress, Popconfirm, message, Icon, Rate} from 'antd';
import { RESTService } from '../Api/api.js';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class RatingComponent extends Component{

    confirm = async () =>{

        let data = {};
        data.rating = this.state.value;
        data.instructor = this.props.instructor;
        await RESTService.rating(data);
        message.info('Clicked on Yes. rating is: '+this.state.value+'  '+this.props.instructor);
    };

    state = {
        value: 3,
      };

    handleChange = value => {
        this.setState({ value });
      };
    
    render(){

        const { value } = this.state;

        return (
            <div>
                <b>Your session is completed <Progress type="circle" percent={100} width={20} /></b>
                <Popconfirm title={
                     <span>
                     <Rate tooltips={desc} onChange={this.handleChange} value={value} />
                     {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                   </span>
                } onConfirm={this.confirm} okText="Yes" cancelText="No"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                    <Button type="link">Rate your session</Button>
                </Popconfirm>
        </div>
        )
    }
}

export default RatingComponent;
import React, { Component } from 'react';
import { Descriptions } from 'antd';

class SummaryComponent extends Component{

    render(){

        const { planSummary } = this.props;
        // const { loading, selectedRowKeys } = this.state;

        let plan = {};

        if(planSummary.plan === 'a'){
            plan.des='Basic plan';
            plan.title='4 Session plan';
            plan.charge='$50/Session';
            plan.amount='$200.00';
            plan.official='$180.00';

        }else if(planSummary.plan === 'b'){
            plan.des='Premium plan';
            plan.title='6 Session plan';
            plan.charge='$40/Session';
            plan.amount='$240.00';
            plan.official='$220.00';

        }else if(planSummary.plan === 'c'){
            plan.des='Gold plan';
            plan.title='10 Session plan';
            plan.charge='$30/Session';
            plan.amount='$300.00';
            plan.official='$280.00';

        }

        return(
            <div>
                <h4 className="alignCenter">Enrollment Summary</h4>
                <Descriptions
                    title="Plan Summary"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                <Descriptions.Item label="Plan">{plan.des}</Descriptions.Item>
                <Descriptions.Item label="Description">{plan.title}</Descriptions.Item>
                <Descriptions.Item label="Charges">{plan.charge}</Descriptions.Item>
                <Descriptions.Item label="Amount">{plan.amount}</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Amount">{plan.official}</Descriptions.Item>
                </Descriptions>
                <br/>

                <Descriptions title="Appointment Schedule" layout="vertical" bordered
                column={{ xs: 8, sm: 16, md: 24}}>
                {this.props.selectedSchedules.map((item,index) => {
                    return (
                        <Descriptions.Item label={"Slot "+(++index)}>
                            Instructor Name: {item.iusername}
                            <br />
                            Date: {item.sdate}
                            <br />
                            <b>Slot: </b>{item.slot.substring(7)}
                            <br />
                        </Descriptions.Item>
                    )
                })}
                </Descriptions>
            </div>
        )
    }
}

export default SummaryComponent;
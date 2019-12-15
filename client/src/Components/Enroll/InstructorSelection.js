import React, { Component } from 'react';
import { Alert , Table, Button, Rate} from 'antd';
import { message } from "antd/lib/index";

class SelectionComponent extends Component{

    state = {
        finalTimeTable:[],
        plan : this.props.plan,
        instructorList : this.props.instructorListFromParent,
        individualData : this.props.individualData,
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    setup = (planSummary) => {

        let timetable = [];
        let slots = this.props.planSummary.slots;
        // let preferedCity = this.props.planSummary.city;
        let instructors=this.state.instructorList;
        let individualData=this.state.individualData;

        console.log('instructors');
        console.log(instructors);

        for(var keys in instructors){
            let temp = instructors[keys];
            let personal = {};

            for(var keys1 in individualData){
                let tempData = individualData[keys1];
                if(tempData.Name === temp.iusername){
                    personal = tempData;
                    break;
                }
            };
            
            if(slots.includes('slot0810') && temp.slot0810 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot1- 8am-10am'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
            if(slots.includes('slot1012') && temp.slot1012 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot2- 10am-12pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
            if(slots.includes('slot1214') && temp.slot1214 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot3- 12pm-2pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
            if(slots.includes('slot1416') && temp.slot1416 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot4- 2pm-4pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0  });
            }
            if(slots.includes('slot1618') && temp.slot1618 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot5- 4pm-6pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
            if(slots.includes('slot1820') && temp.slot1820 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot6- 6pm-8pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
            if(slots.includes('slot2022') && temp.slot2022 === 'Y'){
                timetable.push({iusername:temp.iusername , sdate:temp.sdate, slot:'Slot7- 8pm-10pm'
                , rating : (personal.rating !== undefined ) ?  personal.rating : 0 });
            }
        }

        if(this.state.finalTimeTable.length === 0){
            this.setState({
                finalTimeTable:timetable
            });
        };
    };

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);

        if(Array.isArray(this.state.selectedRowKeys) && this.state.selectedRowKeys.length!==0){

            let data = [];

            for(var keys in this.state.selectedRowKeys){
                data.push(this.state.finalTimeTable[keys]);
            }
            
            this.props.callbackToSelect(data);
        }
        else{
            message.error('Please select at least one schedule');
        }
      };

    render(){

        const columns = [
            {
                title: 'Instructor Name',
                dataIndex: 'iusername'         
            },
            {
                title: 'Date',
                dataIndex: 'sdate'         
            },
            {
                title: 'Available Time slot',
                dataIndex: 'slot'         
            },
            {
                title: 'Instructor Rating',
                dataIndex: 'rating' ,
                render: (rating) => <Rate value={rating} />   
            }
        ];


        this.setup(this.state.planSummary);

        const { loading, selectedRowKeys } = this.state;
        const hasSelected = this.state.plan+1 > selectedRowKeys.length > 0 && selectedRowKeys.length===this.state.plan;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
          };

        return (
            <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
                    Proceed
                </Button><br/>
                <span style={{ marginLeft: 8 }}>
                <Alert type="warning"  closable 
                message = {hasSelected ? `Select ${this.state.plan} schedules`: `Selected ${selectedRowKeys.length} items. You selected ${this.state.plan} schedules plan. If not available then try with different dates and slots.`}
                />
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.finalTimeTable} />
        </div>
        );
    }
}

export default SelectionComponent;
import React, { Component } from 'react';
import { Table,Tag } from 'antd';
import YoutubeComponent from './ReactYoutube';
import { RESTService } from '../Api/api.js'

class ResourcesComponent extends Component{
    
    state = {data: []};

    async componentDidMount() {
        let response = await RESTService.getResources();
        console.log(response);
        this.setState({data: response.data.result});
    }

    render() {

        const columns = [
        
              {
                title: 'Description',
                dataIndex: 'desc',
                width: '40%'
              },
              {
                  title: 'Files',
                  dataIndex: 'file',
                  width: '30%',
                  render: file => (
                      <a href={file}>{file}</a>
                  )
              },
              {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                width: '10%',
                render: tags => (
                  <span>
                    {tags.map(tag => {
                      let color = tag.length > 10 ? 'geekblue' : 'orange';
                      
                      if (tag.toLowerCase().includes('bad')) {
                        color = 'volcano';
                      }
                      else if(tag.toLowerCase().includes('save') || tag.toLowerCase().includes('rules')){
                        color = 'green';
                      }
                      else if (tag.toLowerCase().includes('guide')) {
                        color = 'purple';
                      }
                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}
                  </span>
                ),
              },
              {
                title: 'Videos',
                key : 'videoId',
                dataIndex: 'videoId',
                width: '40%',
                render: videoId => (
                    <YoutubeComponent videoId={videoId}/>
                )
              }
        ];

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} />
            </div>
        );
    }
}

export default ResourcesComponent;
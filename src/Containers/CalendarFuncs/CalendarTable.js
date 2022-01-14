import { Table, Tag, Space } from 'antd';

import { TIMEMATCH_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

export default ({currentDate}) => {
    const { data, loading } = useQuery(TIMEMATCH_QUERY, {variables:{time: currentDate}});
    
    if(loading) return <p>loading...</p>

    const columns = [
        {
          title: '隊名',
          dataIndex: 'team',
          key: 'team',
          width: '15%',
          render: text => <a>{text}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          width: '85%',
          render: times => <>
            {times.map((e) => {
              return(<Tag>{e}</Tag>)
            })}
          </>
        }
      ];
      
      return(
          <Table 
          columns={columns} 
          dataSource={data.timeMatch} 
          pagination={
            { defaultPageSize: 2, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}
          } 
            scroll={{x: true,y: 180}}></Table>
      )
}
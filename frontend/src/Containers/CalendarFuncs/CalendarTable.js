import { Table, Tag, Space } from 'antd';

import { TIMEMATCH_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

export default ({currentDate}) => {
    const { data, loading } = useQuery(TIMEMATCH_QUERY, {variables:{time: currentDate}});
    console.log(data);
    
    const columns = [
        {
          title: '隊名',
          dataIndex: 'team',
          key: 'team',
          render: text => <a>{text}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          render: times => <>
            {times.map((e) => {
              return(<Tag>{e}</Tag>)
            })}
          </>
        }
      ];
      
      if(loading) return <p>loading...</p>

      return(
          <Table columns={columns} dataSource={data?data.timeMatch:undefined} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}
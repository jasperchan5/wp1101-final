import { Table, Tag, Space } from 'antd';

import { ALLTEAM_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

export default ({teamName}) => {
    const { data, loading } = useQuery(ALLTEAM_QUERY);
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
          <Table columns={columns} dataSource={data.allTeam} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}
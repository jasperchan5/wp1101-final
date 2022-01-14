import { Table, Tag, Space, message } from 'antd';

import { ALLTEAM_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

export default ({teamName}) => {
    const { data, loading } = useQuery(ALLTEAM_QUERY);
    console.log(data);
    const columns = [
        {
          title: '隊名',
          dataIndex: 'team',
          key: 'team',
          width: "15%",
          render: text => <a>{text}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          width: "85%",
          render: times => <>
            {times.map((e) => {
              return(<Tag>{e}</Tag>)
            })}
          </>
        }
      ];
      
      if(loading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

      return(
          <Table columns={columns} dataSource={data.allTeam} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}
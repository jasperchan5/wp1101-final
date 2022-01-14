import { Table, Tag, Space, message } from 'antd';

import { ALLMATCH_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default ({teamName}) => {
    const { data, loading } = useQuery(ALLMATCH_QUERY);
    const [nowPercent, setNowPercent] = useState(0)
    console.log(data);
    const columns = [
        {
          title: '對戰組合',
          dataIndex: 'matchName',
          key: 'matchName',
          render: text => <a>{text.split("_").join(" vs ")}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          render: times => <Tag>{times}</Tag>,
        }
      ]

      if(loading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

      return(
          <Table columns={columns} dataSource={data.allMatch} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}
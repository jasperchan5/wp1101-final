import { Table, Tag, Space } from 'antd';

export default () => {
    const columns = [
        {
          title: '編號',
          dataIndex: 'num',
          key: 'num',
          render: text => <a>{text}</a>,
        },
        {
          title: '匹配結果',
          dataIndex: 'result',
          key: 'result',
          render: results => <>
            {
              results.map((e) => {
                return(
                  <Tag>{e}</Tag>
                )
              })
            }
          </>
        },
      ]
      
      const data = [
        {
          key: '1',
          num: 32,
          result: ['台大資管', '大葉電機']
        },
        {
          key: '2',
          num: 37,
          result: ['清大人社', '北醫醫學']
        },
        {
          key: '3',
          num: 39,
          result: ['交大資工', '成大牙醫']
        },
      ];
      
      return(
          <Table columns={columns} dataSource={data}></Table>
      )
}
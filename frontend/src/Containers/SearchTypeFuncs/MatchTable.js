import { Table, Tag, Space } from 'antd';

export default ({teamName}) => {

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
          num: 1,
          result: ['台大資管', '大葉電機']
        },
        {
          key: '2',
          num: 2,
          result: ['清大人社', '北醫醫學']
        },
        {
          key: '3',
          num: 3,
          result: ['交大資工', '成大牙醫']
        },
        {
          key: '4',
          num: 4,
          result: ['交大資工', '成大牙醫']
        },
        {
          key: '5',
          num: 5,
          result: ['交大資工', '成大牙醫']
        },
        {
          key: '5',
          num: 6,
          result: ['交大資工', '成大牙醫']
        },
        {
          key: '5',
          num: 7,
          result: ['交大資工', '成大牙醫']
        },
        {
          key: '5',
          num: 8,
          result: ['交大資工', '成大牙醫']
        },
      ];
      
      return(
          <Table columns={columns} dataSource={data} rowKey={(data) => data.num} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}
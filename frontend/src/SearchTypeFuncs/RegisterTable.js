import { Table, Tag, Space } from 'antd';

export default () => {
    const columns = [
        {
          title: '隊名',
          dataIndex: 'name',
          key: 'name',
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
      
      const data = [
        {
          key: '1',
          name: '台大資管',
          time: ['2021/1/1','2021/1/6','2021/1/10','2021/1/11','2021/1/11','2021/1/11','2021/1/11','2021/1/11','2021/1/11'],
          num: 1
        },
        {
          key: '2',
          name: '清大人社',
          time: ['2021/1/1'],
          num: 2
        },
        {
          key: '3',
          name: '交大資工',
          time: ['2021/1/1'],
          num: 3
        },
      ];
      
      return(
          <Table columns={columns} dataSource={data} rowKey={(data) => data.num} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}